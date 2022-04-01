const AppError = require('../utils/AppError');

chapterItemsController = {};


chapterItemsController.addItem = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'chapterItemsController', 'addItem', 500));
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
