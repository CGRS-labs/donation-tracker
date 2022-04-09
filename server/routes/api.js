const express = require('express');
const itemsRouter = require('./items');
const chaptersRouter = require('./chapters');
const chapterItemsRouter = require('./chapterItems');

const router = express.Router();

// TODO: add auth router

// TODO: use auth controller to validate any requests that get to this point to 
// protect backend api routes from the public

router.use('/items', itemsRouter);
router.use('/chapters', chaptersRouter);
router.use('/chapterItems', chapterItemsRouter);

module.exports = router;
