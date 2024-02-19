// theme.ts
import { createTheme } from '@mui/material/styles';

const themeMonocromatico = createTheme({
  palette: {
    primary: {
      main: '#222',
    },
    secondary: {
      main: '#bdbdbd',
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#111',
      secondary: '#757575',
    },
  },
});

export default themeMonocromatico;

