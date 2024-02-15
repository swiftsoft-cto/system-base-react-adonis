// Home.js
import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { ThemeProvider } from "@mui/material";
import themeMonocromatico from "../../components/Theme";

const Home = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <ThemeProvider theme={themeMonocromatico}>
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
          <Typography paragraph>Lorem ipsum...</Typography>
          <Typography paragraph>Consequat mauris nunc...</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
