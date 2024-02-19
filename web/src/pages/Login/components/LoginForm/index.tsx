// src/components/LoginForm/index.tsx
import React from 'react';
import { Button, TextField, Grid, Link, CircularProgress } from "@mui/material";

interface LoginFormProps {
  emailError: string;
  passwordError: string;
  loginLoading: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleOpenForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  emailError,
  passwordError,
  loginLoading,
  handleSubmit,
  handleOpenForgotPassword,
}) => {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="E-mail"
        name="email"
        autoComplete="email"
        autoFocus
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Senha"
        type="password"
        id="password"
        autoComplete="current-password"
        error={!!passwordError}
        helperText={passwordError}
      />
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2" onClick={handleOpenForgotPassword}>
            Esqueceu sua senha?
          </Link>
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, py: 1.5 }}
        disabled={loginLoading}
      >
        {loginLoading ? <CircularProgress size={24} /> : "Entrar"}
      </Button>
    </>
  );
};

export default LoginForm;
