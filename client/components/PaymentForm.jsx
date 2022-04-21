import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#0057b7',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '20px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      // "::placeholder": { color: "#87bbfd" }
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee'
    }
  }
};



export default function PaymentForm() {

  const [donation, setDonation] = useState('');
  const [open, setOpen] = useState(false);
  const [success, setSuccess ] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
    
  const handleClose = () => {
    setOpen(false);
    window.location.href = '/';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });


    if(!error) {
      try {
        const {id} = paymentMethod;
        const response = await axios.post('/api/stripe/payment', {
          amount: parseInt(donation),
          id
        });

        if(response.data.success) {
          console.log('Successful payment');
          setOpen(true);
          setSuccess(true);
        }

      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
        
    <>
      {open ?  <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              backgroundColor: 'rgb(255,255,255, 0.8)',
            }
          }}
        >
          <DialogContent>
            <DialogContentText sx={{
              color: '#0057b7',
              pt: 5, pb: 5, pl: 3, pr: 3,
              fontSize: '25px',
              fontWeight: 500
            }} id="alert-dialog-description">
            Thank you for your generous donation!
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div> : <></>}
      {!success ? 
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS}/>
            </div>
          </fieldset>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <br></br>    
            <TextField onChange={e => setDonation(e.target.value)} value={donation} id="outlined-basic" label="Donation amount" variant="outlined" />
            <Button           
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 4}} 
            >
        Donate
            </Button>

          </Box>
        </form>
        :
        <></>
      }
            
    </>
  );
}