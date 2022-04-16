const path = require('path');
const express = require('express');
require('dotenv').config();

const apiRouter = require('./routes/api');
const AppError = require('./utils/AppError.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve index.html file
app.get('/', (req, res, next) => {
  // TODO: Is this necessary with webpack dev server
  return res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use('/api', apiRouter);

// 404 handler
app.use((req, res) => {
  console.log(`ERROR: 404 Bad request ${req.method} ${req.url}`);
  return res.status(404).send(`Error 404: ${req.url} not found`);
});

// Global error handler
app.use((err, req, res, next) => {
  if (!(err instanceof AppError)) return next(err);

  const defaultErr = {
    serverLog: 'Express err handler caught an unknown middleware error',
    status: 500,
    message: 'An unkown error occurred'
  };

  const errObj = Object.assign(defaultErr, err);

  console.error(errObj.serverLog, err);

  return res.status(errObj.status).json(errObj.message);

});

const port = process.env.PORT;

//Need to import app.listen because Jest global teardown need the return value of app.listen()
// to close serer after all test is completed.
module.exports = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
