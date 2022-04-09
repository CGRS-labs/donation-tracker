import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ContentBanner from './components/layout/ContentBanner';

const bannerImage = 'https://images.unsplash.com/photo-1529511582893-2d7e684dd128?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1633&q=80';
const sunflowerField = 'https://images.unsplash.com/photo-1535222830855-fd60aca7e065?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';

export default function Homepage() {
  return (
    <Container disableGutters maxWidth="lg" component="div" sx={{ pt: 8, pb: 6 }}>
      <ContentBanner
        content={{
          image: sunflowerField,
          imageText: 'main image description',
          linkText: '',
          title: 'Do Right Donations',
          description: `Over 4.5 million Ukrainian refugees (and counting) have fled their homes with few belongings. They are in need of clothing, medical supplies, food, personal hygiene items, home goods and financial assistance.
            Do Right Donations is working to support our fellow Ukrainians during this humanitarian crisis. Our partners in the Ukraine and neighboring countries have set up distribution sites to meet the refugees immediate needs. If you are able to donate unused or items in good condition, please go to our Chapters page to locate your nearest Do Right Donations chapter.`
        }}
      />
      {/* <Typography
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
      </Typography> */}
    </Container>
  );
};
