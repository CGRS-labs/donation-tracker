import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useToken from '../../hooks/useToken.js';

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

  const mounted = useRef(true);
  // Track when clean up runs to prevent state update in handleSubmit after component unmounts
  useEffect(() => () => (mounted.current = false), []);
  const { token } = useToken();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const headers = {
      'content-type': 'application/json',
    };

    const graphqlQuery = {
      query: `mutation addChapter ($name: String!, $street: String!, $city: String!, $state: String!, $zip: String!, $phone: String!, $email: String!, $longitude: Float!, $latitude: Float!) {
  addChapter (name: $name, street: $street, city: $city, state: $state, zip: $zip, phone: $phone, email: $email, longitude: $longitude, latitude: $latitude) {
    name
        }
      }`,
      variables: {
        name: inputs.name,
        street: inputs.street,
        city: inputs.city,
        state: inputs.state,
        zip: inputs.zip,
        phone: inputs.phone,
        email: inputs.email,
        // longitude: -82,
        // latitude: 42,
      },
    };

    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(graphqlQuery),
    };

    fetch('/graphql', options)
      .then((res) => res.json())
      .then((data) => {
        // redirect to the dashboard
        navigate('/dashboard');
      })
      .catch((error) => console.log(error));
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
        <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
          <WarehouseIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add a New Chapter
        </Typography>
        <Box
          id="chapter-form"
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
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
