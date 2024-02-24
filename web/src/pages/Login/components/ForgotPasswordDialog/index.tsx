// src/components/ForgotPasswordDialog/index.tsx
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, CircularProgress } from "@mui/material";

interface ForgotPasswordDialogProps {
  open: boolean;
  handleClose: () => void;
  forgotPasswordEmail: string;
  setForgotPasswordEmail: (value: string) => void;
  handleForgotPasswordSubmit: () => void;
  resetPasswordLoading: boolean;
}

const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({
  open,
  handleClose,
  forgotPasswordEmail,
  setForgotPasswordEmail,
  handleForgotPasswordSubmit,
  resetPasswordLoading,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
       <DialogTitle>Esqueceu sua senha?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para redefinir sua senha, por favor, insira seu e-mail aqui. Nós
            enviaremos um link para redefinir sua senha.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="emailForgotPassword"
            label="Endereço de E-mail"
            type="email"
            fullWidth
            variant="standard"
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>

          <Button onClick={handleForgotPasswordSubmit} disabled={resetPasswordLoading}>
            {resetPasswordLoading ? <CircularProgress size={24} /> : "Enviar"}
          </Button>
        </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
