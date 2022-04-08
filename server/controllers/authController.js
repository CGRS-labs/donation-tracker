const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

authController = {};

authController.createToken = async (req, res, next) => {
  // synchronous
  try {
    // create a jwt with the email as the payload
    const token = await jwt.sign({ email: req.body.email }, process.env.TOKEN_KEY, { expiresIn: '1h' });
    // query the database for the user's email, chapterId, firstName, and lastName
    const text = 'SELECT email, chapterId, firstName, lastName FROM users WHERE email=$1;';
    const values = [req.body.email];
    const result = await client.query(text, values);
    // store the user info in an object
    const user = {
      email: result[0].email,
      chapterId: result[0].chapterId,
      firstName: result[0].firstName,
      lastName: result[0].lastName
    };
    // store the token and user object on res.locals
    res.locals = {
      token,
      user
    };
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
