const express = require('express');

const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register',
  usersController.validateRegistration,
  usersController.hashPassword,
  usersController.addUser,
  (req, res) => {
    return res.sendStatus(200);
  }
);

// include middleware for generating token
router.post('/login',
  usersController.getPassword,
  usersController.comparePasswords,
  authController.createToken,
  (req, res) => {
    return res.send(200).json({ token: res.locals.token });
  }
);

module.exports = router;

