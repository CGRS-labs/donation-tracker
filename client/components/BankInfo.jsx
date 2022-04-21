import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ContentBanner from './layout/ContentBanner';
import stripelogo from '../assets/images/stripelogo.png';
import StripeContainer from './StripeContainer';

const sunflowerField = stripelogo;

function Title() {
  return (
    <Typography
      paddingTop="80px"
      fontSize='19px'
      align="center"
      color="#0057b7"
      gutterBottom
    >
      Credit card information
    </Typography>
  );
}

export default function BankInfo(props) {

  return (
    <div className='App'>
      <Container style = {{display: props.dsp}} disableGutters maxWidth="lg" component="div" sx={{ pt: 8, pb: 6 }}>
        <ContentBanner
      
          content={{
            image: sunflowerField,
            imageText: 'main image description',
            linkText: '',
            title: <Title/>,
            description: <StripeContainer />
          }}
        />
      </Container>
    </div>
  );
}