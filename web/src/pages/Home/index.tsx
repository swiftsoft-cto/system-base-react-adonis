import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { ThemeProvider } from "@mui/material";
import monochrome from "../../Themes/Monochrome";

const Home = () => {
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
        <Sidebar mobileOpen={mobileOpen} handleDrawerClose={handleDrawerClose} />
        <Box
          component="main"
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            width: { sm: `calc(100% - 240px)` },
            marginLeft: { sm: '240px' }, 
          }}
        >
          <Toolbar /> 
          <Typography paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos quasi id amet deserunt voluptates iure qui harum at repellendus! Quaerat perspiciatis ipsa dolor ut a non numquam ex sit?
          </Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, dolores! Repudiandae reprehenderit neque laborum, inventore optio, accusamus obcaecati maiores nulla quo voluptatem quia aut earum eveniet, eos vero dicta? Soluta.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
