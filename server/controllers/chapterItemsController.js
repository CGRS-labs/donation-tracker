const AppError = require('../utils/AppError');
const db = require('../models.js');

chapterItemsController = {};


chapterItemsController.addItem = async (req, res, next) => {
  const {
    item_id,
    total_needed,
    total_received
  } = req.body;

  const { chapter_id } = req.params;

  //query that updates the totals based on the items table-- make separate controller for this and put in middleware

  // const total_needed= *****;

  try {
    const text = 'INSERT INTO public.chapter_items (chapter_id, item_id, total_needed, total_received)VALUES ($1, $2, $3, $4) RETURNING * ;';
    const params = [chapter_id, item_id, total_needed, total_received];
    const res = await db.query(text, params);
    console.log(`Successfully added ${res.rows[0]} to the database`);
  } catch (err) {
    return next(new AppError(new Error('Not implemented'), 'chapterItemsController', 'addItem', 500));
  }
};

chapterItemsController.updateItem = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'chapterItemsController', 'updateItem', 500));
};

chapterItemsController.deleteItem = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'chapterItemsController', 'deleteItem', 500));
};

chapterItemsController.getItem = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'chapterItemsController', 'getItem', 500));
};

chapterItemsController.getAllItems = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'chapterItemsController', 'getAllItems', 500));
};


module.exports = chapterItemsController;
