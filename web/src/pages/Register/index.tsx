// src/pages/Register/index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CssBaseline,
    Container,
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Link,
    CircularProgress
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import monochrome from '../../Themes/Monochrome';
import api from "../../services/api";
import CustomAlert from "../../components/CustomAlert";
import Logo from "../../assets/images/logo.png";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useAuth } from '../../contexts/AuthContext';

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

export default function Register() {
    const navigate = useNavigate();
    const { updateUserAccessLevel, setIsAuthenticated } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertInfo, setAlertInfo] = useState<{ severity: "success" | "error"; message: string }>({ severity: "success", message: "" });
    const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

    const handleAlertClose = () => {
        setAlertInfo({ ...alertInfo, message: "" });
    };

    const validateForm = () => {
        let isValid = true;
        let errors: any = {};

        if (!name.trim()) {
            errors.name = "Nome é obrigatório";
            isValid = false;
        }

        if (!email.trim()) {
            errors.email = "E-mail é obrigatório";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "E-mail inválido";
            isValid = false;
        }

        if (!password) {
            errors.password = "Senha é obrigatória";
            isValid = false;
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = "As senhas não coincidem";
            isValid = false;
        }

        if (!hasAgreedToTerms) {
            errors.terms = "Você deve aceitar os Termos de Uso e Política de Privacidade para se registrar.";
            isValid = false;
        }

        // Atualiza o estado de alerta com a primeira mensagem de erro encontrada
        if (!isValid) {
            const firstError = errors[Object.keys(errors)[0]];
            setAlertInfo({ severity: "error", message: firstError });
        }

        return isValid;
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        if (!hasAgreedToTerms) {
            setAlertInfo({ severity: "error", message: "Você deve aceitar os Termos de Uso e Política de Privacidade para se registrar." });
            return;

        }

        if (password !== confirmPassword) {
            setAlertInfo({ severity: "error", message: "As senhas não coincidem." });
            return;

        }

        setLoading(true);

        try {
            const response = await api.post("register", { name, email, password });
            const data = response.data;

            setAlertInfo({ severity: data.success, message: data.message });

            if (data.success == "success") {
                try {
                    const response = await api.post("login", { email, password });
                    const token = response.data.token;
                    const userAccessLevel = response.data.user.id_profile;
                    if (token) {
                        localStorage.setItem("token", token.token);
                        updateUserAccessLevel(userAccessLevel);
                        setIsAuthenticated(true);

                        if (userAccessLevel == 1) {
                            navigate("/admin/dashboard");
                        } else if (userAccessLevel == 2) {
                            navigate("/cliente/dashboard");
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
                }
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Erro ao tentar registrar. Tente novamente mais tarde.";
            setAlertInfo({ severity: "error", message: errorMessage });

        } finally {
            setLoading(false);

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
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nome Completo"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
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
                            label="Confirme a Senha"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="agree"
                                    color="primary"
                                    checked={hasAgreedToTerms}
                                    onChange={(e) => setHasAgreedToTerms(e.target.checked)}
                                />
                            }
                            label={
                                <Typography variant="body2">
                                    Eu aceito os {" "}
                                    <Link href="/termos-de-uso" target="_blank">
                                        Termos de Uso
                                    </Link>
                                    {" "}e{" "}
                                    <Link href="/politica-de-privacidade" target="_blank">
                                        Política de Privacidade
                                    </Link>.
                                </Typography>
                            }
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Registrar"}
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Já tem uma conta? Faça login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {alertInfo.message && (
                    <CustomAlert
                        severity={alertInfo.severity}
                        message={alertInfo.message}
                        onClose={handleAlertClose}
                    />
                )}
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}