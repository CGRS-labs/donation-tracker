const db = require('../models.js');

const AppError = require('../utils/AppError');
const getGeocodeFromAddress = require('../utils/geocode');

const chaptersController = {};

chaptersController.getAllChapters = async (req, res, next) => {
  try {
    // eslint-disable-next-line semi
    const text = 'SELECT * FROM public.chapters ORDER BY name ASC;'
    const result = await db.query(text);
    res.locals.chapters = result.rows;
    return next();
  } catch (err) {
    return next(new AppError(err, 'chaptersController', 'getAllChapters', 500));
  }
};

chaptersController.getChapter = async (req, res, next) => {
  const {
    chapterId
  } = req.params;

  try {
    // eslint-disable-next-line semi
    const text = 'SELECT * FROM public.chapters WHERE id = $1;'
    const values = [chapterId];
    const result = await db.query(text, values);
    [res.locals.chapter] = result.rows;
    next();
  } catch (err) {
    return next(new AppError(err, 'chaptersController', 'getChapter', 500));
  }
};

chaptersController.addChapter = async (req, res, next) => {
  const {
    name,
    street,
    city,
    state,
    zip,
    phone,
    email
  } = req.body;

  const {
    latitude,
    longitude
  } = res.locals;

  try {
    // eslint-disable-next-line semi
    const text = 'SELECT name, zip FROM public.chapters WHERE name = $1 AND zip = $2;'
    const values = [name, zip];
    const response = await db.query(text, values);
    if (response.rows[0]) {
      return res.status(400).send('This chapter already exists in the database');
    } else {
      // eslint-disable-next-line semi
      const text2 = 'INSERT INTO public.chapters (name, zip, street, city, state, phone, email, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;'
      const values2 = [name, zip, street, city, state, phone, email, latitude, longitude];
      await db.query(text2, values2);
      return next();
    }
  } catch (err) {
    return next(new AppError(err, 'chaptersController', 'addChapter', 500));
  }
};

chaptersController.updateChapter = async (req, res, next) => {
  const {
    chapterId
  } = req.params;

  const {
    name,
    street,
    city,
    state,
    zip,
    phone,
    email
  } = req.body;

  const {
    latitude,
    longitude
  } = res.locals;
  try {
    // eslint-disable-next-line semi
    const text = 'UPDATE public.chapters SET name = $2, street = $3, city = $4, state = $5, zip = $6, phone = $7, email = $8, latitude = $9, longitude = $10 WHERE id = $1;'
    const values = [chapterId, name, street, city, state, zip, phone, email, latitude, longitude];
    const { rowCount } = await db.query(text, values);
    if (rowCount === 0) {
      return res.status(404).send('Error: 404 Chapter not found');
    }
    return next();
  } catch (err) {
    return next(new AppError(err, 'chaptersController', 'updateChapter', 500));
  };
};


chaptersController.deleteChapter = async (req, res, next) => {
  const {
    chapterId
  } = req.params;

  try {
    // eslint-disable-next-line semi
    const text = 'DELETE FROM public.chapters WHERE id = $1;'
    const values = [chapterId];
    await db.query(text, values);
    return next();
  } catch (err) {
    return next(new AppError(err, 'chaptersController', 'deleteChapter', 500));
  }
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