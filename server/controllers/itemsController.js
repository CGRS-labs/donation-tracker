const AppError = require('../utils/AppError');
const db = require ('../models.js');

//Items received: This will be a calculation of all of the chapters received
//Items needed: separate path to update items needed

const itemsController = {};

itemsController.getAllItems = async (req, res, next) => {
  try {
    // eslint-disable-next-line semi
    const text = 'SELECT * FROM public.items ORDER BY name ASC'
    await db.query(text, (err, result) => {
      if (!result.rows[0]) return res.send('There are no items in the database');
      if (result) return res.send(result.rows);
      if (err) return res.send('error getting items from database');
    });
  } catch (err) {
    return next(new AppError(new Error('Not implemented'), 'itemsController', 'getItems', 500));
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
    await db.query(text, values, (err, result) => {
      if (!result.rows[0]) return res.send('Error: No Item with this ID is in the database');
      if (result) return res.send(result.rows[0]);
      if (err) return res.send('error getting items from database');
    });
  } catch (err) {
    return next(new AppError(new Error('Not implemented'), 'itemsController', 'getItem', 500));
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
      return res.send('Item added to database');
    } 
  } catch {
    return next(new AppError(new Error('Not implemented'), 'itemsController', 'addItem', 500));
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
    db.query(text, values);
    return res.send('successfully updated');
  } catch (err) {
    return next(new AppError(new Error('Not implemented'), 'itemsController', 'updateItem', 500));
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
    db.query(text, values);
    res.send('successfully deleted');

  } catch (err) {
    return next(new AppError(new Error('Not implemented'), 'itemsController', 'deleteItem', 500));
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