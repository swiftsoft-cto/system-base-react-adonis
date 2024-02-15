import React, { useEffect, useState } from 'react';
import { Modal, Button, Box, Typography, TextField, Grid } from '@mui/material';
import api from '../../services/api';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PaymentIcon from '@mui/icons-material/Payment';
import HistoryIcon from '@mui/icons-material/History';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { AlertColor } from '@mui/material';
import CustomAlert from '../CustomAlert';
import Logo from '../../img/logo.png'


const Sidebar = ({ mobileOpen, handleDrawerClose }: any) => {
    const navigate = useNavigate();

    const [alertInfo, setAlertInfo] = useState<{
        open: boolean;
        severity: AlertColor;
        message: string;
    }>({
        open: false,
        severity: 'info',
        message: '',
    });
    const [userSettings, setUserSettings] = useState({
        name: '',
        email: '',
    });
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    const handleLogout = async () => {
        try {
            await api.post('logout');
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            setAlertInfo({ open: true, severity: 'error', message: 'Falha ao sair!' });
        }
    };
    const handleChange = (event: any) => {
        const { name, email, value } = event.target;
        setUserSettings((prevSettings: any) => ({
            ...prevSettings,
            [name]: value,
            [email]: value,
        }));
    };
    
    const drawerWidth = 240;

    const drawerContent = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    gap: 1,
                }}
            >
                <img
                    src={Logo}
                    alt="Logo"
                    style={{ maxHeight: '50px', cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                />
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Swift Soft
                </Typography>
            </Toolbar>
            <List>
                <ListItem>
                    <ListItemText primary="Projetos" />
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <ListItemText primary="Contratos" />
                </ListItem>
                <Divider />
                {/* Item para visualizar contratos */}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <FileCopyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Meus Contratos" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <ListItemText primary="Financeiro" />
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <PaymentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Pagamentos" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HistoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Histórico" />
                    </ListItemButton>
                </ListItem>
            </List>

            <Box sx={{ mt: 'auto' }}>
                <Divider />
                <List>
                    {/* Itens fixados no fundo */}
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleOpenModal}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ajustes" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sair" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    const handleSaveChanges = async () => {
        try {
            const response = await api.put('user-settings', {
                ...userSettings,
                // Adicione outros campos conforme necessário
            });
            console.log('Alterações salvas:', response.data);
            handleCloseModal();
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
        }
    };
    const fetchUserSettings = async () => {
        try {
            const response = await api.get('user-settings');
            const { name, email } = response.data;
            setUserSettings(prevSettings => ({
                ...prevSettings,
                name, 
                email, 
            }));
        } catch (error) {
            console.error('Erro ao solicitar dados do usuário:', error);
            setAlertInfo({ open: true, severity: 'error', message: 'Falha ao solicitar dados do usuário!' });
        }
    };
    useEffect(() => {
            fetchUserSettings();
    }, [navigate]);
    


    return (
        <div>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawerContent}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawerContent}
            </Drawer>
            <CustomAlert
                open={alertInfo.open}
                handleClose={() => setAlertInfo({ ...alertInfo, open: false })}
                severity={alertInfo.severity}
                message={alertInfo.message}
            />
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Ajustes do Usuário
                    </Typography>
                    <TextField
                        fullWidth
                        label="Nome"
                        variant="outlined"
                        name="name"
                        value={userSettings.name}
                        onChange={handleChange}
                        sx={{ my: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={userSettings.email}
                        onChange={handleChange}
                        sx={{ my: 2 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button variant="contained" onClick={handleSaveChanges} >
                            Salvar 
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default Sidebar;