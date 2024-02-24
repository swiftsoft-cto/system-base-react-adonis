import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  ThemeProvider,
  AlertColor,
} from '@mui/material';
import CustomAlert from '../../components/CustomAlert'; // Importação do CustomAlert
import Logo from "../../assets/images/logo.png";
import monochrome from '../../Themes/Monochrome';

const RecoverPass = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{
    severity: AlertColor;
    message: string;
  }>({
    severity: "error", // Isso garante que severity seja do tipo AlertColor
    message: "",
  });

  const handleAlertClose = () => {
    setAlertInfo({ ...alertInfo, message: "" });
};

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setAlertInfo({ severity: 'error', message: 'As senhas não coincidem.' });
      return false;
    }
    return true;
  };

  const { token } = useParams();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!validatePasswords()) {
      return;
    }
    setLoading(true);

    if (!token) {
      setAlertInfo({ severity: 'error', message: 'Token não encontrado.' });
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('reset-password', {
        password,
        token,
      });

      // Supondo que a API retorna { message: "Senha redefinida com sucesso!" } em caso de sucesso
      setAlertInfo({ severity: 'success', message: response.data.message || "Senha redefinida com sucesso!" });
    } catch (error: any) {
      console.error(error);
      // Aqui assumimos que a resposta de erro também contém um campo message
      // Você pode precisar ajustar isso com base no formato exato da resposta de erro da sua API
      const errorMessage = error.response && error.response.data.message ? error.response.data.message : 'Ocorreu um erro ao tentar redefinir a senha, tente novamente mais tarde.';
      setAlertInfo({ severity: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }

  };
  const handleGoToLogin = () => {
    navigate('/'); // Substitua '/login' pelo seu caminho correto para a página de login
  };

  return (
    <ThemeProvider theme={monochrome}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={Logo} alt="Logo" style={{ width: "80px" }} />
          <Typography component="h1" variant="h5">
            Redefinição de Senha
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Nova Senha"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirme a Nova Senha"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Redefinir Senha'}
            </Button>
            {alertInfo.severity === 'success' && (
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={handleGoToLogin}
              >
                acessar minha conta
              </Button>
            )}
          </Box>
        </Box>
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
};

export default RecoverPass;
