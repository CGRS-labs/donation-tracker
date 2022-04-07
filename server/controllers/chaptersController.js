const AppError = require('../utils/AppError');
const getGeocodeFromAddress = require('../utils/geocode');

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

chaptersController.validateAddressInfo = (req, res, next) => {
  if (!req.body.street || !req.body.city || !req.body.state || !req.body.zip) {
    return next(new AppError(new Error('Expected street, city, state and zip to exist on request body'), 'chaptersController', 'validateAddressInfo', 400));
  }

  return next();

};

chaptersController.getGeocode = async (req, res, next) => {
  const { street, city, state, zip } = req.body;

  try {

    const [longitude, latitude] = await getGeocodeFromAddress(street, city, state, zip);
    res.locals.longitude = longitude;
    res.locals.latitude = latitude;

    return next();

  } catch (err) {
    return next(new AppError(err, 'chaptersController', 'getGeocode', 500));
  }
};


module.exports = chaptersController;
