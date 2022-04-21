import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';

import ResponsiveAppBar from './NavBar';
import theme from '../../../client/styles/theme.js';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        3MandJ
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.paper', pb: 2 }} component="footer">
      <Typography variant="subtitle1" align="center" gutterBottom mt={2}>
        It is the obligation of every person born in a safer room 
        to open the door when someone in danger knocks.
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        component="p"
      >
        — Dina Nayeri
      </Typography>
      <Copyright />
    </Box>
  );
};

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 2,
            flexGrow: 1,
          }}
          component='main'
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
