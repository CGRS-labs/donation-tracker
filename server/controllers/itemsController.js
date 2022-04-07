const AppError = require('../utils/AppError');
const db = require ('../models.js');

//Items received: This will be a calculation of all of the chapters received
//Items needed: separate path to update items needed

const itemsController = {};

itemsController.getAllItems = async (req, res, next) => {
  try {
    // eslint-disable-next-line semi
    const text = 'SELECT * FROM public.items ORDER BY name ASC'
    const result = await db.query(text);
    res.locals.items = result.rows;
    next();
  } catch (err) {
    return next(new AppError(err, 'itemsController', 'getItems', 500));
  };
};

itemsController.getItem = async (req, res, next) => {
  const {
    itemId
  } = req.params;

  try {
    // eslint-disable-next-line semi
    const text = 'SELECT * FROM public.items WHERE id = $1'
    const values = [itemId];
    const result = await db.query(text, values);
    res.locals.item = result.rows;
    next();
  } catch (err) {
    return next(new AppError(err, 'itemsController', 'getItem', 500));
  };
};

itemsController.addItem = async (req, res, next) => {
  const {
    name,
    total_received,
    total_needed,
    category
  } = req.body;
  
  try {
    // eslint-disable-next-line semi
    const text = 'SELECT name, category FROM public.items WHERE name = $1 AND category = $2'
    const values = [name, category];
    const response = await db.query(text, values);
    if (response.rows[0]) {
      return res.send('This item already exists in the database. Please update the existing item instead');
    } else {
      // eslint-disable-next-line semi
      const text2 = 'INSERT INTO public.items (name, total_received, total_needed, category) VALUES ($1, $2, $3, $4) RETURNING *'
      const values2 = [name, total_received, total_needed, category];
      const addedItem = await db.query(text2, values2);
      res.locals.item = addedItem.rows;
      next();
    } 
  } catch {
    return next(new AppError(err, 'itemsController', 'addItem', 500));
  }
};

itemsController.updateItem = async (req, res, next) => {
  const {
    itemId
  } = req.params;

  const {
    name,
    total_received,
    category,
    total_needed
  } = req.body;

  try {
    // eslint-disable-next-line semi
    const text = 'UPDATE public.items SET name = $2, total_needed = $3, total_received = $4, category = $5 WHERE id = $1'
    const values = [itemId, name, total_needed, total_received, category];
    await db.query(text, values);
    next();
  } catch (err) {
    return next(new AppError(err, 'itemsController', 'updateItem', 500));
  };
};

// itemsController.updateItemsNeeded = async (req, res, next) => {
// };


itemsController.deleteItem = async (req, res, next) => {
  const {
    itemId
  } = req.params;

  try {
    // eslint-disable-next-line semi
    const text = 'DELETE FROM public.items WHERE id = $1'
    const values = [itemId];
    await db.query(text, values);
    next();

  } catch (err) {
    return next(new AppError(err, 'itemsController', 'deleteItem', 500));
  }
};

/**
 * Stores table and primary key col names on res.locals as table and column respectively
 */
itemsController.storeTableAndColumnNames = (req, res, next) => {
  res.locals.table = 'items';
  res.locals.column = 'id';
  res.locals.id = req.params.itemId;
  return next();
};

module.exports = itemsController;