const express = require('express');
const itemsRouter = require('./items');
const chaptersRouter = require('./chapters');
const usersRouter = require('./users');
const stripeRouter = require('./stripe');

const router = express.Router();

router.use('/', usersRouter);
router.use('/stripe', stripeRouter);
router.use('/items', itemsRouter);
router.use('/chapters', chaptersRouter);

module.exports = router;
