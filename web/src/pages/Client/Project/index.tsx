// Home.js
import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Chip, Grid, Stack, SvgIcon, ThemeProvider } from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import monochrome from "../../../Themes/Monochrome";


const ClientProject = () => {
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
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` },
            marginLeft: { sm: '240px' },
            marginTop: '64px'
          }}
        >
          <Grid container rowSpacing={4} columnSpacing={4}>
            <Grid item lg={3}>
              <Card
                sx={{ border: '1px solid #e6ebf1', boxShadow: 'none' }}
                >
                <CardContent>
                  <Box sx={{ p: 2.25 }}>
                    <Stack spacing={0.5}>
                      <Typography variant="h6" color="textSecondary">
                        Produtividade
                      </Typography>
                      <Stack direction="row" alignItems="center">
                        <Typography variant="h5" color="inherit">
                          EMPRESA
                        </Typography>
                        {50 !== undefined && (
                          <Chip
                            variant="outlined"
                            icon={<TrendingUpIcon style={{ color: '#1677ff' }} />}
                            label={`100%`}
                            sx={{ ml: 1.25, pl: .7, borderRadius: "4px", backgroundColor: '#e6f4ff', borderColor: '#69b1ff', color: '#1677ff' }}
                            size="small"
                          />
                        )}
                        
                      </Stack>
                      <Typography color="textSecondary">
                        Esta semana
                      </Typography>
                    </Stack>
                    
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={3}>
              <Card
                sx={{ border: '1px solid #e6ebf1', boxShadow: 'none' }}
                >
                <CardContent>
                  <Box sx={{ p: 2.25 }}>
                    <Stack spacing={0.5}>
                      <Typography variant="h6" color="textSecondary">
                        Produtividade
                      </Typography>
                      <Stack direction="row" alignItems="center">
                        <Typography variant="h5" color="inherit">
                          EMPRESA
                        </Typography>
                        {50 !== undefined && (
                          <Chip
                            variant="outlined"
                            icon={<TrendingUpIcon style={{ color: '#1677ff' }} />}
                            label={`100%`}
                            sx={{ ml: 1.25, pl: .7, borderRadius: "4px", backgroundColor: '#e6f4ff', borderColor: '#69b1ff', color: '#1677ff' }}
                            size="small"
                          />
                        )}
                        
                      </Stack>
                      <Typography color="textSecondary">
                        Esta semana
                      </Typography>
                    </Stack>
                    
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={3}>
              <Card
                sx={{ border: '1px solid #e6ebf1', boxShadow: 'none' }}
                >
                <CardContent>
                  <Box sx={{ p: 2.25 }}>
                    <Stack spacing={0.5}>
                      <Typography variant="h6" color="textSecondary">
                        Produtividade
                      </Typography>
                      <Stack direction="row" alignItems="center">
                        <Typography variant="h5" color="inherit">
                          EMPRESA
                        </Typography>
                        {50 !== undefined && (
                          <Chip
                            variant="outlined"
                            icon={<TrendingUpIcon style={{ color: '#1677ff' }} />}
                            label={`100%`}
                            sx={{ ml: 1.25, pl: .7, borderRadius: "4px", backgroundColor: '#e6f4ff', borderColor: '#69b1ff', color: '#1677ff' }}
                            size="small"
                          />
                        )}
                        
                      </Stack>
                      <Typography color="textSecondary">
                        Esta semana
                      </Typography>
                    </Stack>
                    
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={3}>
              <Card
                sx={{ border: '1px solid #e6ebf1', boxShadow: 'none' }}
                >
                <CardContent>
                  <Box sx={{ p: 2.25 }}>
                    <Stack spacing={0.5}>
                      <Typography variant="h6" color="textSecondary">
                        Produtividade
                      </Typography>
                      <Stack direction="row" alignItems="center">
                        <Typography variant="h5" color="inherit">
                          EMPRESA
                        </Typography>
                        {50 !== undefined && (
                          <Chip
                            variant="outlined"
                            icon={<TrendingUpIcon style={{ color: '#1677ff' }} />}
                            label={`100%`}
                            sx={{ ml: 1.25, pl: .7, borderRadius: "4px", backgroundColor: '#e6f4ff', borderColor: '#69b1ff', color: '#1677ff' }}
                            size="small"
                          />
                        )}
                        
                      </Stack>
                      <Typography color="textSecondary">
                        Esta semana
                      </Typography>
                    </Stack>
                    
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ClientProject;
