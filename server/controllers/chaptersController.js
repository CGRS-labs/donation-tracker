const AppError = require('../utils/AppError');

const chaptersController = {};

chaptersController.getAllChapters = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'chaptersController', 'getAllChapters', 500));
};

chaptersController.getChapter = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'chaptersController', 'getChapter', 500));
};

chaptersController.addChapter = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'chaptersController', 'addChapter', 500));
};

chaptersController.updateChapter = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'chaptersController', 'updateChapter', 500));
};

chaptersController.deleteChapter = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'chaptersController', 'deleteChapter', 500));
};

chaptersController.storeTableAndColumnNames = (req, res, next) => {
  res.locals.table = 'chapters';
  res.locals.column = 'id';
  res.locals.id = req.params.chapterId;
  return next();
};

module.exports = chaptersController;