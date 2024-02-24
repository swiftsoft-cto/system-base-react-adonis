import React, { useEffect, useState } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface CustomAlertProps {
  severity: AlertColor;
  message: string;
  onClose?: () => void; 
}

const CustomAlert: React.FC<CustomAlertProps> = ({ severity, message, onClose }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!message);
  }, [message]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    onClose?.(); 
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
