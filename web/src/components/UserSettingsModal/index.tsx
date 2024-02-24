// src/components/UserSettingsModal/index.tsx
import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface UserSettingsModalProps {
  open: boolean;
  handleClose: () => void;
  userSettings: { name: string; email: string; };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveChanges: () => void;
}

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



const UserSettingsModal: React.FC<UserSettingsModalProps> = ({
  open, handleClose, userSettings, handleChange, handleSaveChanges
}) => {


  return (
    <Modal
        open={open}
        onClose={handleClose}
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
                disabled
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" onClick={handleSaveChanges}>
                    Salvar
                </Button>
            </Box>
        </Box>
    </Modal>
  );
};

export default UserSettingsModal;
