import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function Homepage() {
  return (
    <Container disableGutters maxWidth="sm" component="div" sx={{ pt: 8, pb: 6 }}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Do Right Donations
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" component="p">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Sem et tortor consequat id porta nibh venenatis. Ultrices neque ornare aenean euismod. Turpis in eu mi bibendum neque egestas
        congue. At urna condimentum mattis pellentesque id nibh tortor id.
      </Typography>
    </Container>
  );
};
