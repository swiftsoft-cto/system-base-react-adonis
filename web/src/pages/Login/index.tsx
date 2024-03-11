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
import Logo from "../../assets/images/logo.png";
import CustomAlert from "../../components/CustomAlert";
import ForgotPasswordDialog from './components/ForgotPasswordDialog';
import LoginForm from './components/LoginForm';
import monochrome from '../../Themes/Monochrome';
import { useAuth } from '../../contexts/AuthContext';

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
        <Link href="https://swiftsoft.com.br/" target="_blank" rel="noopener noreferrer" variant="body2">

          Swift Soft
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const navigate = useNavigate();
  const { updateUserAccessLevel, setIsAuthenticated } = useAuth();

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

  const handleAlertClose = () => {
    setAlertInfo({ ...alertInfo, message: "" });
  };

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
        const userAccessLevel = response.data.user.id_profile;
        if (token) {
          localStorage.setItem("token", token.token);
          updateUserAccessLevel(userAccessLevel);
          setIsAuthenticated(true);

          if (userAccessLevel == 1) {
            navigate("/admin/projetos/software");
          } else if (userAccessLevel == 2) {
            navigate("/cliente/projetos/software");
          } else {
            setAlertInfo({
              severity: "error",
              message: "Nível de acesso não reconhecido.",
            });
          }

        } else {
          setAlertInfo({
            severity: "error",
            message: "Falha na autenticação, token não fornecido.",
          });
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
    <ThemeProvider theme={monochrome}>
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

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="registro" variant="body2" >
                  {"Não tem uma conta? Registre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      {alertInfo.message && (
        <CustomAlert
          severity={alertInfo.severity}
          message={alertInfo.message}
          onClose={handleAlertClose}
        />
      )}

    </ThemeProvider>
  );
}
