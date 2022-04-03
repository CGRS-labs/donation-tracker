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
import { MenuItemUnstyled } from '@mui/base';


const theme = createTheme();

const categories = ['Childcare', 'Clothing', 'Education', 'Food', 'Healthcare', 'Homegoods', 'Personal hygiene', 'Other']

export default function Add() {
  const [inputs, setInputs] = useState({
    item: '',
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
    const data = new FormData(document.getElementById('addItem'));
    console.log('item', data.get('item'), 'category', data.get('category'), 'quantity', data.get('quantity'));
    fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(res => console.log(res));

    setInputs({
      item: '',
      category: '',
      quantity: 0,
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
          <Box id="addItem" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="item"
              label="Item"
              name="item"
              value= { inputs.item || '' }
              autoComplete="item"
              autoFocus
              onChange = { handleChange }
            />
            <Grid item xs={12}>
              <InputLabel id='category-select'>Category</InputLabel>
              <Select
                labelId='category-select-label'
                id='category-select'
                name='category'
                value={inputs.category || ''}
                label='Category'
                onChange={handleChange}
                style={{
                  minWidth: '100%',
                }}
              >
                {categories.map((category) => {
                  <MenuItemUnstyled
                    key={category}
                    value={category}
                    >
                      {category}
                  </MenuItemUnstyled>
                })}
              </Select>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              name="quantity"
              value = { inputs.quantity || 0}
              label="Quantity"
              type="quantity"
              id="quantity"
              autoComplete="quantity"
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
