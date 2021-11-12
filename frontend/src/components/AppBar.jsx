import React from 'react';
import {
  AppBar as MuiAppBar, Toolbar, Typography, Box, IconButton,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AppBarLink from './AppBarLink';
import HideIfNotLogged from './HideIfNotLogged';

const AppBar = () => (
  <MuiAppBar position="static">
    <Toolbar>
      <Box sx={{ display: { xs: 'inline', md: 'none' } }}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box style={{ flexGrow: 1 }}>
        <Typography variant="h4" component="span">Risbeegomfkerho</Typography>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'inline' } }}>
        <AppBarLink to="/" text="Etusivu" />
        <AppBarLink to="/competitions" text="Kisat" />
        <HideIfNotLogged>
          <AppBarLink to="/stats" text="Stats" />
          <AppBarLink to="/settings" text="Settings" />
          <AppBarLink to="/upload" text="Upload" />
          <AppBarLink to="/logs" text="Logs" />
        </HideIfNotLogged>
      </Box>
    </Toolbar>
  </MuiAppBar>
);

export default AppBar;
