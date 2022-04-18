const AppError = require('../utils/AppError');
const getGeocodeFromAddress = require('../utils/geocode');

const chapterMiddleware = {};

chapterMiddleware.getGeocode = async (req, res, next) => {
  const { street, city, state, zip } = req.body.variables;

  try {

    const [longitude, latitude] = await getGeocodeFromAddress(street, city, state, zip);
    req.body.variables.longitude = longitude;
    req.body.variables.latitude = latitude;

  } catch (err) {
    return next(new AppError(err, 'chaptersController', 'getGeocode', 500));
  }
};

module.exports = chapterMiddleware;