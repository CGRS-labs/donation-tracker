const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');

const client = require('../models');

authController = {};

authController.createToken = async (req, res, next) => {
  try {
    // create a jwt with the email as the payload
    const token = await jwt.sign({ email: req.body.email }, process.env.TOKEN_KEY, { expiresIn: '1h' });
    // query the database for the user's email, chapterId, firstName, and lastName
    const text = 'SELECT email, chapter_id, first_name, last_name FROM users WHERE email=$1;';
    const values = [req.body.email];
    const { rows: [userInfo] } = await client.query(text, values);
    // store the user info in an object
    const user = {
      email: userInfo.email,
      chapterId: userInfo.chapter_id,
      firstName: userInfo.first_name,
      lastName: userInfo.last_name
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
      return next(new AppError(err, 'authController', 'validateToken', 403));
    }

    //grab email from decoded
    //check that email exists in system
    const text = 'SELECT * FROM users WHERE email=$1;';
    const values = [decoded.email];

    try {
      const { rowCount } = client.query(text, values);
      if (rowCount === 0) {
        //if it doesn't exist, send 403
        return res.status(403).send('Invalid Credentials');
      }
      return next();
    } catch (err) {
      return next(new AppError(err, 'authController', 'validateToken', 403));
    }
  });
};

module.exports = authController;
