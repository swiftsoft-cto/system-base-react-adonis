import React, { useState } from 'react';
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

import {
  Link,
  CssBaseline,
  Container,
  Box,
  Grid,
  Typography,
  AlertColor,
} from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import themeMonocromatico from "../../components/Theme";
import Logo from "../../assets/images/logo.png";
import CustomAlert from "../../components/CustomAlert";
import ForgotPasswordDialog from './components/ForgotPasswordDialog';
import LoginForm from './components/LoginForm';



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

  const [alertInfo, setAlertInfo] = useState<{
    severity: AlertColor;
    message: string;
  }>({
    severity: "success",
    message: "",
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (validateForm(email, password)) {
      setLoginLoading(true);
      try {
        const response = await api.post("login", { email, password });
        const token = response.data.token;

        // Sucesso no login
        if (token) {
          const expirationDate = new Date(token.expires_at);
          const currentDate = new Date();
          if (expirationDate > currentDate) {
            localStorage.setItem("token", token.token);
            navigate("/home")

          } else {
            setAlertInfo({
              severity: "error",
              message: "O token de autenticação expirou. Faça login novamente.",
            });
          }
        }
      } catch (error: any) {
        let errorMessage = "Ocorreu um erro ao tentar realizar o login.";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        setAlertInfo({
          severity: "error",
          message: errorMessage,
        });
      } finally {
        setLoginLoading(false);
      }
    }

  };

  const handleForgotPasswordSubmit = async () => {
    setResetPasswordLoading(true);
    if (!forgotPasswordEmail) {
      console.error("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      await api.post("recover-token", { email: forgotPasswordEmail });
      setAlertInfo({
        severity: "success",
        message:
          "E-mail de redefinição enviado com sucesso! Verifique sua caixa de entrada.",
      });

      handleCloseForgotPassword();
      setResetPasswordLoading(false);
    } catch (error) {
      console.error("Erro ao enviar e-mail de redefinição de senha:", error);
      setAlertInfo({
        severity: "error",
        message:
          "Erro ao enviar e-mail de redefinição. Por favor, tente novamente mais tarde.",
      });

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
            <LoginForm
              emailError={emailError}
              passwordError={passwordError}
              loginLoading={loginLoading}
              handleSubmit={handleSubmit}
              handleOpenForgotPassword={handleOpenForgotPassword}
            />
            <ForgotPasswordDialog
              open={openForgotPassword}
              handleClose={handleCloseForgotPassword}
              forgotPasswordEmail={forgotPasswordEmail}
              setForgotPasswordEmail={setForgotPasswordEmail}
              handleForgotPasswordSubmit={handleForgotPasswordSubmit}
              resetPasswordLoading={resetPasswordLoading}
            />

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
        severity={alertInfo.severity}
        message={alertInfo.message}
      />

    </ThemeProvider>
  );
}
