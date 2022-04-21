const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const stripeController = {};

stripeController.start = async (req, res) => {
  console.log('this is body', req.body);
  const { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Do right donation',
      payment_method: id,
      confirm: true
    });
    console.log('Payment', payment);
    res.json({
      message: 'Payment successful',
      amount: amount,
      currency: 'USD',
      success: true
    });
  } catch (error) {
    console.log('Error', error);
    res.json({
      message: 'Payment failed',
      success: false
    });
  }
};

module.exports = stripeController;