import React, { useState } from 'react';
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Link,
  TextField,
  CssBaseline,
  Container,
  Box,
  Grid,
  Typography,
  CircularProgress,
  AlertColor,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import themeMonocromatico from "../../components/Theme";
import Logo from "../../img/logo.png";
import CustomAlert from "../../components/CustomAlert";



export default function Login() {
  function Copyright(props: any) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://swiftsoft.com.br/">
          Swift Soft
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState < {
    severity: AlertColor;
    message: string;
  } > ({
    severity: "success", // Isso garante que severity seja do tipo AlertColor
    message: "Operação realizada com sucesso!",
  });
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleOpenForgotPassword = () => {
    setOpenForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setOpenForgotPassword(false);
  };

  const validateForm = (email: string, password: string) => {
    let isValid = true;
    if (!email) {
      setEmailError("E-mail é obrigatório");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("E-mail inválido");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Senha é obrigatória");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (validateForm(email, password)) {
      setLoginLoading(true);
      try {
        const response = await api.post("login", { email, password });
        const { token } = response.data;
        if (token && token.token) {
          const expirationDate = new Date(token.expires_at);
          const currentDate = new Date();
          if (expirationDate > currentDate) {
            localStorage.setItem("token", token.token);
            setAlertInfo({
              severity: "success",
              message: "Login bem-sucedido!",
            });
            setOpen(true);
            navigate("/home");
          } else {
            setAlertInfo({
              severity: "error",
              message: "O token de autenticação expirou. Faça login novamente.",
            });
            setOpen(true);
          }
        } else {
          setAlertInfo({
            severity: "error",
            message: "Credenciais inválidas.",
          });
          setOpen(true);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          console.error("Erro no login", error);
          setAlertInfo({ severity: "error", message: "Falha no login!" });
          setOpen(true);
        } else {
          setAlertInfo({
            severity: "error",
            message: "Credenciais inválidas.",
          });
          setOpen(true);
        }
      } finally {
        setLoginLoading(false);
      }
    }
  };

  const handleForgotPasswordSubmit = async () => {
    setResetPasswordLoading(true);
    if (!forgotPasswordEmail) {
      // Adicione uma verificação de e-mail inválido ou vazio se necessário
      console.error("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      // Substitua a URL pelo endpoint correto da sua API
      await api.post("recover-token", { email: forgotPasswordEmail });
      setAlertInfo({
        severity: "success",
        message:
          "E-mail de redefinição enviado com sucesso! Verifique sua caixa de entrada.",
      });
      setOpen(true);
      handleCloseForgotPassword();
      setResetPasswordLoading(false);
    } catch (error) {
      console.error("Erro ao enviar e-mail de redefinição de senha:", error);
      setAlertInfo({
        severity: "error",
        message:
          "Erro ao enviar e-mail de redefinição. Por favor, tente novamente mais tarde.",
      });
      setOpen(true);
      setResetPasswordLoading(false);
    }
  };

  return (
    <ThemeProvider theme={themeMonocromatico}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={Logo} alt="Logo" style={{ width: "80px" }} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!passwordError}
              helperText={passwordError}
            />
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  onClick={handleOpenForgotPassword}
                >
                  Esqueceu sua senha?
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loginLoading}
            >
              {loginLoading ? <CircularProgress size={24} /> : "Entrar"}
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Não tem uma conta? Registre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <CustomAlert
        open={open}
        handleClose={handleClose}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />

      <Dialog open={openForgotPassword} onClose={handleCloseForgotPassword}>
        <DialogTitle>Esqueceu sua senha?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para redefinir sua senha, por favor, insira seu e-mail aqui. Nós
            enviaremos um link para redefinir sua senha.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="emailForgotPassword"
            label="Endereço de E-mail"
            type="email"
            fullWidth
            variant="standard"
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForgotPassword}>Cancelar</Button>

          <Button onClick={handleForgotPasswordSubmit} disabled={resetPasswordLoading}>
            {resetPasswordLoading ? <CircularProgress size={24} /> : "Enviar"}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
