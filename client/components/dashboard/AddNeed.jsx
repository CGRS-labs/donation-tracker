import React, { useEffect, useState, useRef } from 'react';
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

export default function AddNeed({ onSubmit }) {
  const [inputs, setInputs] = useState({
    item: '',
    category: '',
    quantity: 0,
  });

  const mounted = useRef(true);

  // Track when cleanuup runs to prevent state update in handleSubmit after component unmounts
  useEffect(() => () => mounted.current = false, []);
  const { token } = useToken();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const headers = {
      'content-type': 'application/json',
    };
    const graphqlQuery = {
      query: `mutation addNeed ($name: String!, $category: String!, $total_needed: Int!, $total_received: Int!) {
            addNeed (name: $name, category: $category, total_needed: $total_needed, total_received: $total_received) {
          name
        }
      }`,
      variables: {
        name: inputs.item,
        category: inputs.category,
        total_needed: parseInt(inputs.quantity),
        total_received: 0
      },
    };
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(graphqlQuery),
    };

    fetch('/graphql', options)
      .then(res => res.json())
      .then(data => {
        setInputs({
          itemId: '',
          category: '',
          quantity: 0,
        });
        onSubmit()
      })
      .catch(error => console.log(error));
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
