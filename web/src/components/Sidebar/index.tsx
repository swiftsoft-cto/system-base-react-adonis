// src/components/Sidebar/index.tsx
import React, { useState, useEffect } from 'react';
import { Drawer, Toolbar, Box, Typography, Divider, AlertColor } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import CustomAlert from '../CustomAlert';
import SidebarNavList from '../SidebarNavList';
import api from '../../services/api';
import UserSettingsModal from '../UserSettingsModal';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerClose }: any) => {
    const navigate = useNavigate();
    const [userSettings, setUserSettings] = useState({ name: '', email: '' });
    const [modalOpen, setModalOpen] = useState(false);
    const [alertInfo, setAlertInfo] = useState<{
        severity: AlertColor;
        message: string;
      }>({
        severity: "error", // Isso garante que severity seja do tipo AlertColor
        message: "",
      });
    useEffect(() => {
        fetchUserSettings();
    }, []);

    const fetchUserSettings = async () => {
        try {
            const response = await api.get('user-settings');
            setUserSettings({ name: response.data.name, email: response.data.email });
        } catch (error) {
            console.error('Erro ao solicitar dados do usuário:', error);
            setAlertInfo({ severity: 'error', message: 'Falha ao solicitar dados do usuário!' });
        }
    };

    const handleLogout = async () => {
        try {
            await api.post('logout');
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            setAlertInfo({ severity: 'error', message: 'Falha ao sair!' });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserSettings((prevSettings) => ({
            ...prevSettings,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await api.put('user-settings-edit', userSettings);
            setAlertInfo({ severity: 'success', message: 'Configurações atualizadas com sucesso!' });
            setModalOpen(false);
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
            setAlertInfo({ severity: 'error', message: 'Erro ao salvar alterações.' });
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                <SidebarNavList handleOpenSettings={() => setModalOpen(true)} handleLogout={handleLogout} />
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                <Toolbar>
                    <img src={Logo} alt="Logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', width: 'auto', height: '50px' }} />
                </Toolbar>
                <Divider />
                <SidebarNavList handleOpenSettings={() => setModalOpen(true)} handleLogout={handleLogout} />
            </Drawer>
            <UserSettingsModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                userSettings={userSettings}
                handleChange={handleChange}
                handleSaveChanges={handleSaveChanges}
            />
            <CustomAlert severity={alertInfo.severity} message={alertInfo.message} />
        </Box>
    );
};

export default Sidebar;
