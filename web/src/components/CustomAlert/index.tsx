import React, { useEffect, useState } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface CustomAlertProps {
  severity: AlertColor;
  message: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ severity, message }) => {
  // Inicia com open falso e só abre se houver mensagem
  const [open, setOpen] = useState(false);

  // Efeito para abrir o alerta automaticamente quando há uma mensagem
  useEffect(() => {
    if (message) {
      setOpen(true); // Abre o alerta se houver mensagem
    } else {
      setOpen(false); // Mantém o alerta fechado se não houver mensagem
    }
  }, [message]); // Dependência do efeito é a mensagem

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false); // Fecha o alerta
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
