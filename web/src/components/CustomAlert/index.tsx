import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface CustomAlertProps {
    open: boolean;
    handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
    severity: AlertColor;
    message: string;
  }
  

const CustomAlert: React.FC<CustomAlertProps> = ({ open, handleClose, severity, message }) => {
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
