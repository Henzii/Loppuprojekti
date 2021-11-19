import React, { useState } from 'react';
import {
  AppBar as MuiAppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import NaviLinkit from './NaviLinkit';

const AppBar = () => {
  const [ankkuri, setAnkkuri] = useState(null);
  const menuOpen = Boolean(ankkuri);

  return (
    <MuiAppBar position="sticky" sx={{ minHeight: { md: '100px' } }} style={{ justifyContent: 'center' }}>
      <Toolbar>
        <Box sx={{ display: { xs: 'inline', md: 'none' } }}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={(e) => setAnkkuri(e.currentTarget)}>
            <MenuIcon fontSize="large" />
          </IconButton>
          <Menu
            open={menuOpen}
            anchorEl={ankkuri}
            onClose={() => setAnkkuri(null)}
          >
            <NaviLinkit Wrap={MenuItem} />
          </Menu>
        </Box>
        <Box style={{ flexGrow: 1 }}>
          <Typography variant="h3" component="span">Risbeegomfkerho</Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'inline' } }}>
          <NaviLinkit />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
