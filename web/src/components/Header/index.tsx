import React, { useState } from 'react';
import './style.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications'; // Ícone de notificações
import InputBase from '@mui/material/InputBase'; // Para a barra de pesquisa
import SearchIcon from '@mui/icons-material/Search'; // Ícone de pesquisa
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box'; // Para espaçamento flexível
import Badge from '@mui/material/Badge';
import { Autocomplete, List, ListItem, ListItemText, Popover, TextField, Typography, createFilterOptions } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';


const Header = ({ handleDrawerToggle }: any) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate(); // Chame o useNavigate aqui, no topo do componente

  const handleNotificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // Exemplo de notificações com datas
  const notifications = [
    { id: 1, title: "Notificação 1", details: "Detalhes da notificação 1", date: "10/jan" },
    { id: 2, title: "Notificação 2", details: "Detalhes da notificação 2", date: "11/jan" },
    { id: 3, title: "Notificação 3", details: "Detalhes da notificação 3", date: "12/jan" },
    { id: 4, title: "Notificação 4", details: "Detalhes da notificação 4", date: "13/jan" },
    { id: 5, title: "Notificação 5", details: "Detalhes da notificação 5", date: "14/jan" },
  ];

  
  return (
    <AppBar position="fixed" sx={{ width: { sm: `calc(100% - 240px)` }, ml: { sm: `240px` } }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
          <MenuIcon />
        </IconButton>



        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={handleNotificationClick}>
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleNotificationClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ p: 2, minWidth: 300 }}>
            <Typography sx={{ mb: 2 }}>Notificações</Typography>
            <List>
              {notifications.map((notification) => (
                <ListItem key={notification.id} alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1">
                          {notification.title}
                        </Typography>
                        <Typography variant="caption" sx={{ ml: 2 }}>
                          {notification.date}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {notification.details}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Popover>
      </Toolbar>
    </AppBar>
  );
};


export default Header;
