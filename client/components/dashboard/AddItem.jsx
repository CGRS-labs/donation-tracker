import React, { useEffect, useState, useRef, useContext } from 'react';
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

import useToken from '../../hooks/useToken';
import { UserContext } from '../../hooks/userContext.js';


export default function AddItem(props) {

  const [inputs, setInputs] = useState({
    itemId: '',
    category: '',
    total_received: 0,
  });
  const [selectItems, setSelectItems] = useState([]);
  const { token } = useToken();
  const { user } = useContext(UserContext);
  const mounted = useRef(true);

  const canSave = inputs.category !== '' && inputs.itemId > -1 && inputs.total_received !== 0;

  useEffect(async () => {

    
    const headers = {
      'content-type': 'application/json',
    };

    const graphqlQuery = {
      'query': `{
        items{
          name
          total_needed
          total_received
          category
        }
      }`,
    };

    const options = {
      'method': 'POST',
      'headers': headers,
      'body': JSON.stringify(graphqlQuery)
    };

    fetch('http://localhost:4000/graphql', options)
      .then(res => res.json())
      .then(data => setSelectItems(data.data.items))
      .catch(error => console.log(error));


    // try {
    //   const response = await fetch('/api/items/');
    //   const data = await response.json();

    //   if (response.ok) {
    //     if (mounted.current) {
    //       setSelectItems(data.items);
    //     }
    //   } else {
    //     console.error(data.error);
    //   }
    // } catch (err) {
    //   console.error(err);
    // }

    // Track when cleanup runs to prevent state update in handleSubmit after component unmounts
    return () => () => mounted.current = false;
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    if (!canSave) return;
    event.preventDefault();

    const headers = {
      "content-type": "application/json",
    };
    const graphqlQuery = {
      query: `mutation addItem ($first_name: String!, $last_name: String!, $email: String!, $password: String!, $chapter_id: Int!) {
  addItem (first_name: $first_name, last_name: $last_name, email: $email, password: $password, chapter_id: $chapter_id) {
    first_name
        }
      }`,
      variables: {
        name: inputs.firstName,

      },
    };

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(graphqlQuery),
    };

    // try {

    //   const response = await fetch(`/api/chapters/${user.chapterId}/items/`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': token
    //     },
    //     body: JSON.stringify(inputs),
    //   });
    //   if (response.ok) {
    //     if (mounted.current) {
    //       setInputs({
    //         itemId: '',
    //         category: '',
    //         quantity: 0,
    //       });
    //     }
    //     // A NEW GET REQUEST IS NEEDED TO FETCH TABLE DATA ONCE THIS ITEM IS ADDED
    //     props.updateTable();
    //   } else {
    //     console.error(await response.json());
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const menuItems = selectItems
    .filter((item) => item.category === inputs.category)
    .map((row) => {
      return (
        <MenuItem
          key={row.id}
          value={row.id}
        >
          {row.name}
        </MenuItem>
      );
    });

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
              name='itemId'
              value={inputs.itemId || ''}
              input={<OutlinedInput label="Item" />}
              onChange={handleChange}
            // disabled={menuItems.length === 0}
            >
              {menuItems.length === 0 && <MenuItem id={-1} value="None">No Items Available</MenuItem >}
              {menuItems}
            </Select>
          </FormControl>
        </Grid>
        <FormControl sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="total_received"
            value={inputs.total_received || ''}
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
          disabled={!canSave}
        >
          Add Item
        </Button>
      </Box>
    </Container>
  );
}
