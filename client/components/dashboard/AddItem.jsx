import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function Add() {
  const [inputs, setInputs] = useState({
    name: '',
    category: '',
    quantity: 0,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(document.getElementById('login'));
    console.log({
      email: data.get('name'),
      password: data.get('password'),
    });
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(res => console.log(res));

    setInputs({
      email: '',
      password: '',
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            New Donation
          </Typography>
          <Box id="login" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value= { inputs.email || '' }
              autoComplete="email"
              autoFocus
              onChange = { handleChange }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value = { inputs.password || ''}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = { handleChange }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Item
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
