const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const client = require('../models.js');

usersController = {};

// do we need to use await anywhere?
usersController.hashPassword = (req, res, next) => {
  // use bcrypt to hash the password
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) return next(new AppError(err, 'usersController', 'hashPassword', 500));
    // store hashed pw on res.locals
    res.locals.hash = hash;
    // handle err?

    // call next middleware
    return next();
  });
};

usersController.getPassword = async (req, res, next) => {
  // check if the user exists and get hashed pw from the database
  const text = 'SELECT password FROM users WHERE email=$1;';
  const values = [req.body.email];

  try {
    const { rowCount, rows } = await client.query(text, values);
    if (rowCount === 0) {
      return res.status(401).send('User not found');
    }

    res.locals.password = rows[0].password;

    return next();
  } catch (err) {
    // use AppError?
    return next(new AppError(err, 'usersController', 'comparePasswords', 500));
  }

};

usersController.comparePasswords = async (req, res, next) => {
  // use bcrypt's compare function
  bcrypt.compare(req.body.password, res.locals.password, function (err, result) {
    if (err) {
      return next(new AppError(err, 'usersController', 'comparePasswords', 500));
    }

    if (result) return next();
    // use err?
    return res.status(400).send('Incorrect Password');
  });
};

usersController.validateRegistration = async (req, res, next) => {
  if (!req.body.password || !req.body.email || !req.body.chapterId || !req.body.firstName || !req.body.lastName) {
    return next(new AppError(new Error('Expected password, email, chapter ID, first name, and last name to exist on request body'), 'usersController', 'validateRegistration', 400));
  }
  // check that unique keys don't already exist (username, email?)
  const text = 'SELECT * FROM users WHERE email=$1;';
  const values = [req.body.email];

  try {
    const result = await client.query(text, values);
    if (result[0]) return next(new AppError(new Error('Username already exists'), 'usersController', 'validateRegistration', 400));

  } catch (err) {
    return next(new AppError(err, 'usersController', 'validateRegistration', 500));
  }

  return next();
};

usersController.addUser = async (req, res, next) => {
  // hashed pw in res.locals.hash
  const text = 'INSERT INTO users(password, email, chapter_id, first_name, last_name) VALUES($1, $2, $3, $4, $5);';
  const values = [res.locals.hash, req.body.email, req.body.chapterId, req.body.firstName, req.body.lastName];

  try {
    const result = await client.query(text, values);

  } catch (err) {
    return next(new AppError(err, 'usersController', 'addUser', 500));
  }

  return next();
};

/**
 * Get's a list of users for a given chapter.
 * Stores first_name, last_name, email in an array on res.locals.users
 *  @requires chapterId to exist on params
 */
usersController.getUsersByChapter = async (req, res, next) => {
  const text = 'SELECT email, first_name, last_name FROM users WHERE chapter_id = ($1);';
  const values = [req.params.chapterId];

  try {
    const { rows } = await client.query(text, values);
    res.locals.users = rows;
    return next();
  } catch (err) {
    return next(new AppError(err, 'usersController', 'getUsersByChapter', 500));
  }
};

module.exports = usersController;
