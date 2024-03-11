// src/pages/NotFound.tsx
import React from 'react';
import { Container, Typography, Button, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import monochrome from '../../Themes/Monochrome';
import { useAuth } from '../../contexts/AuthContext';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const { userAccessLevel } = useAuth();
    const dashboardPath = userAccessLevel === 1 ? '/admin/projetos/software' : userAccessLevel === 2 ? '/cliente/projetos/software' : '/';

    const handleGoBack = () => {
        navigate(dashboardPath);
    };

    return (
        <ThemeProvider theme={monochrome}>
            <Container component="main" maxWidth="xs" sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h1" color="error" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Página Não Encontrada
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Desculpe, a página que você está procurando não existe.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGoBack}
                    sx={{ mt: 2 }}
                >
                    VOLTAR PARA A PÁGINA INICIAL
                </Button>
            </Container>
        </ThemeProvider>
    );
};

export default NotFound;
