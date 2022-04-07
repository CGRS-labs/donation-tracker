const express = require('express');
const itemsRouter = require('./items');
const chaptersRouter = require('./chapters');
const usersRouter = require('./users');
const authController = require('../controllers/authController');
const router = express.Router();

router.use('/', usersRouter);

router.use(authController.validateToken, (req, res, next) => {
  next('route');
});
router.use('/items', itemsRouter);
router.use('/chapters', chaptersRouter);

module.exports = router;
