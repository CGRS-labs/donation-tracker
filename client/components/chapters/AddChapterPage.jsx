import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function AddChapterPages() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/chapters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs),
    });

    if (response.ok) {
      setInputs({
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: '',
      });
      // redirect to the dashboard
      navigate('/dashboard');
    } else {
      console.error(await response.json());
    }

  };

  return (
    <Container component="div" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <WarehouseIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add a New Chapter
        </Typography>
        <Box id='chapter-form' component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="organization"
                name="name"
                required
                fullWidth
                id="name"
                label="Chapter Name"
                value={inputs.name}
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                value={inputs.phone}
                autoComplete="family-name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={inputs.email}
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="street"
                label="Street Address"
                type="text"
                id="street"
                value={inputs.street}
                autoComplete="street-address"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="city"
                label="City"
                type="text"
                id="city"
                value={inputs.city}
                autoComplete="address-level2"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                required
                fullWidth
                name="state"
                label="State"
                type="text"
                id="state"
                value={inputs.state}
                autoComplete="address-level1"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                required
                fullWidth
                name="zip"
                label="Zip"
                type="text"
                id="zip"
                value={inputs.zip}
                autoComplete="postal-code"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Chapter
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
