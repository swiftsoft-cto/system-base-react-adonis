// Home.js
import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider } from "@mui/material";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import monochrome from "../../../Themes/Monochrome";

const AdminProject = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <ThemeProvider theme={monochrome}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerClose={handleDrawerClose}
        />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
        >
          <Toolbar />
          <Typography paragraph>Lista de Projetos do Admin</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminProject;
