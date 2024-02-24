import React from 'react';
import { Container, Typography, Button, ThemeProvider, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import monochrome from '../../Themes/Monochrome';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Unauthorized: React.FC = () => {
    const { userAccessLevel } = useAuth();
    const dashboardPath = userAccessLevel === 1 ? '/admin/dashboard' : userAccessLevel === 2 ? '/cliente/dashboard' : '/';

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(dashboardPath);
    };

    return (
        <ThemeProvider theme={monochrome}>
            <Container component="main" maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
                <Box sx={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                    <LockOutlinedIcon sx={{ fontSize: 60, color: 'error.main' }} />
                    <Typography variant="h5" gutterBottom>
                        Acesso Não Autorizado
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Você não tem permissão para acessar esta página. Por favor, verifique se você está logado com a conta correta ou contate o suporte para mais informações.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleGoBack}
                        sx={{ mt: 3, mb: 2, py: 1.1 }}
                    >
                       Voltar à Página Inicial
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Unauthorized;
