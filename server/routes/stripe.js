require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');

router.post('/payment', 
  stripeController.start,
  (req, res) => {
    return res.json(res.locals.linkToken);
  });


module.exports = router;