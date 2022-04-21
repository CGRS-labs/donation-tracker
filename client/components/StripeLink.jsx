import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ContentBanner from './layout/ContentBanner';
import stripelogo from '../assets/images/stripelogo.png';

function Description() {
  return (
    <div>
      <Typography variant="h5" align="left" color="#0057b7" component="p">
Everyday, <strong>Do Right Donations</strong> is working hard to find partners, so the help to the ones in need, would arrive as fast as possible.
      </Typography>
      <br></br>
      <Typography variant="h5" align="left" color="#0057b7" component="p">
If you live far away from any of our donations centers, you can make a donation trough our payment portal.
      </Typography>
      <br></br>
      <Typography variant="h5" align="left" color="#0057b7" component="p">
  With <strong>Stripe</strong> as our partner, your information is safe and secure.
      </Typography>
    </div>
  );
};

const StripeApp = (props) => {

  return (
    <div className='App'>
      <Container style = {{display: props.dsp}} disableGutters maxWidth="lg" component="div" sx={{ pt: 8, pb: 6 }}>
        <ContentBanner
      
          content={{
            image: stripelogo,
            imageText: 'main image description',
            linkText: '',
            description: <Description />
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >

          <Button           
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 4}} 
            onClick={() => 
              window.location.href = '/bank'
            } 

          >
          Make a donation
          </Button>

        </Box>
      </Container>
    </div>
  );
};

export default StripeApp;
