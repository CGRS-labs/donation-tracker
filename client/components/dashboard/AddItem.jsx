import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel, Select } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';


const categories = ['Childcare', 'Clothing', 'Education', 'Food', 'Healthcare', 'Homegoods', 'Personal hygiene', 'Other'];

export default function Add() {
  const [inputs, setInputs] = useState({
    item: '',
    category: '',
    quantity: 0,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(document.getElementById('addItem'));
    // console.log('item', data.get('item'), 'category', data.get('category'), 'quantity', data.get('quantity'));
    try {

      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs),
      })
      if (response.ok) {
        setInputs({
          item: '',
          category: '',
          quantity: 0,
        });
      } else {
        console.error(await response.json());
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
        New Donation
      </Typography>
      <Box id="addItem" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <FormControl sx={{ mx: 'auto', width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="item"
            label="Item"
            name="item"
            value={inputs.item || ''}
            autoComplete="item"
            autoFocus

            onChange={handleChange}
          />
        </FormControl>
        <Grid item xs={12}>
          <FormControl sx={{ mt: 1, width: '100%' }}>
            <InputLabel id='outlined-category-label'>Category</InputLabel>
            <Select
              labelId='outlined-category-label'
              id='category-select'
              name='category'
              value={inputs.category || ''}
              input={<OutlinedInput label="Category" />}
              onChange={handleChange}
            >
              {categories.map((category) => {
                return (
                  <MenuItem
                    key={category}
                    value={category}
                  >
                    {category}
                  </MenuItem>);
              })}
            </Select>
          </FormControl>
        </Grid>
        <FormControl sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="quantity"
            value={inputs.quantity || 0}
            label="Quantity"
            type="number"
            id="quantity"
            autoComplete="quantity"
            onChange={handleChange}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ width: '100%', mt: 2, mb: 1 }}
        >
          Add Item
        </Button>
      </Box>
    </Container>
  );
}
