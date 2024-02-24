import { createTheme } from "@mui/material";

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            contrastText: '#fff',
        },
        secondary: {
            main: '#dc004e',
            contrastText: '#fff',
        },
        error: {
            main: '#d32f2f',
        },
        background: {
            default: '#f0f2f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#333',
            secondary: '#555',
        },
    },
    typography: {
        fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        h1: {
            fontSize: '2.125rem',
        },
        body1: {
            fontSize: '1rem',
        },
    },

    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1976d2',
                    color: '#fff',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
                containedPrimary: {
                    color: '#fff',
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                underline: {
                    '&:hover:not(.Mui-disabled):before': {
                        borderBottom: '2px solid #1976d2',
                    },
                    '&:after': {
                        borderBottom: '2px solid #1976d2',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1976d2', 
                    },
                },
                notchedOutline: {
                    borderColor: '#ccc', 
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#333', 
                    textDecoration: 'underline', 
                    '&:hover': {
                        color: '#666', 
                    },
                },
            },
        },
    },
});

export default defaultTheme;
