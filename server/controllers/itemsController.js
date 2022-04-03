const AppError = require('../utils/AppError');
const db = require ('../models.js');


const itemsController = {};

itemsController.getAllItems = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'itemsController', 'getItems', 500));
};

itemsController.getItem = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'itemsController', 'getItem', 500));
};

itemsController.addItem = async (req, res, next) => {

  //Items received: This will be a calculation of all of the chapters received
  //Items needed: separate path to update items needed

  return next(new AppError(new Error('Not implemented'), 'itemsController', 'addItem', 500));
};

itemsController.updateItem = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'itemsController', 'updateItem', 500));
};

itemsController.deleteItem = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'itemsController', 'deleteItem', 500));

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