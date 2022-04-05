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
        CGRS-Labs
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.paper', pb: 2 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Something here to give the footer a purpose!
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
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            py: 2,
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
