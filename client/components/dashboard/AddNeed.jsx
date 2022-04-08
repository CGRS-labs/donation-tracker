import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel, Select } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

import categories from './categories.js';
import useToken from '../../hooks/useToken.js';

export default function AddNeed() {
  const [inputs, setInputs] = useState({
    item: '',
    category: '',
    quantity: 0,
  });

  const { token } = useToken();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          name: inputs.item,
          category: inputs.category,
          total_needed: inputs.quantity,
          total_received: 0,
        }),
      });

      if (response.ok) {
        // TODO: Don't do this if component unmounts
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
        Add Need
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
              value={inputs.category}
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
            value={inputs.quantity}
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
          Add Need
        </Button>
      </Box>
    </Container>
  );
}
