import { Box, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import monochrome from "../../Themes/Monochrome";

const Main = ({ children }: any) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDrawerClose = () => {
        setMobileOpen(false);
    };

    return (
        <ThemeProvider theme={monochrome}>
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Sidebar mobileOpen={mobileOpen} handleDrawerClose={handleDrawerClose} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - 284px)` },
                    maxWidth: {sm: '100%'},
                    paddingLeft: { sm: '260px' },
                    paddingTop: {xs: '84px'}
                }}
            >
                {children}
            </Box>
        </ThemeProvider>
    );
};

export default Main;
