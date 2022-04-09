import React, { useState, useEffect } from 'react';
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


export default function AddItem (props) {
  
  const [inputs, setInputs] = useState({
    name: '',
    category: '',
    total_received: 0,
    items: [],
  });
  const [selectItems, setSelectItems] = useState([]);

  useEffect( async () => {
    try {
      const response = await fetch('/api/items/names');
      const menuItems = await response.json();
      console.log('response', menuItems);

      if (response.ok) {
        setSelectItems(menuItems);
      } else {
        console.error(menuItems.error);
      }
    
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(document.getElementById('addItem'));
    data = Object.fromEntries(data);
    data['itemId'] = selectItems.filter((el) => el.name === data.name)[0].id;
    console.log(data);

    try {

      const response = await fetch('/api/chapterItems/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setInputs({
          item: '',
          category: '',
          quantity: 0,
        });
        props.updateTable();
      } else {
        console.error(await response.json());
      }

      // A NEW GET REQUEST IS NEEDED TO FETCH TABLE DATA ONCE THIS ITEM IS ADDED

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
        New Donation
      </Typography>
      <Box id="addItem" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <FormControl sx={{ width: '100%' }}>
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
        <Grid item xs={12}>
          <FormControl sx={{ mt: 2, mx: 'auto', width: '100%' }}>
            <InputLabel id='item-category-label'>Item</InputLabel>
            <Select
              labelId='outlined-item-label'
              id='item-select'
              name='name'
              value={inputs.name || ''}
              input={<OutlinedInput label="Item" />}
              onChange={handleChange}
            >
              {selectItems.map((row) => {
                return (
                  <MenuItem
                    key={row.id}
                    item_id={row.id}
                    value={row.name}
                  >
                    {row.name}
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
            name="total_received"
            value = { inputs.total_received || ''}
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
          sx={{ width: '100%', mt: 2, mb: 3 }}
        >
          Add Item
        </Button>
      </Box>
    </Container>
  );
}
