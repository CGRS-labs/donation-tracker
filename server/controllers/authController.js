const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
//json web token package for jwts
//secret key will live in .env file. Just make a random string with 30-40 characters.

// process.env = {
//   TOKEN_KEY: 'asd;laksdjf;askf',
//   port: 3000,
//   mapbox_token: 'alksdjf;alsdkjf'
// };


authController = {};

authController.createToken = async (req, res, next) => {
  // synchronous
  try {
    const token = await jwt.sign({ email: req.body.email }, process.env.TOKEN_KEY, { expiresIn: '1h' });
    res.locals.token = token;
    return next();
  } catch (err) {
    return next(new AppError(err, 'authController', 'createToken', 500));
  }

};
// generate token
// call jwt package, set expiry date, include email, sign using secret key from process.env, store on res and
// send it back

// validate token
authController.validateToken = (req, res, next) => {
  // asynchronous
  jwt.verify(req.headers.authorization, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    //grab email from decoded
    //check that email exists in system
    const text = 'SELECT * FROM users WHERE email=$1;';
    const values = [decoded.email];

    try {
      const result = client.query(text, values);
      //if so, return next()
      return next();
    } catch (err) {
      //if it doesn't exist, send 403
      return res.sendStatus(403);
    }
  });
};

module.exports = authController;
