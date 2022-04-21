import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = 'pk_test_51KqNu7AhdhjXVjuvLQmQQbeMgU2S9TkzmGGG7FMUoM71gGadzMO1pooBnAWadwPWJU2lx5HPOnQoYosd4gF4F0qB00fnL5W20v';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}