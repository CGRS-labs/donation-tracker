const path = require('path');
const cors = require('cors');
const express = require('express');
const { graphQLServer, graphQLGeoMiddleWare } = require('./graphqlServer');
const authController = require('./controllers/authController');
require('dotenv').config();

const apiRouter = require('./routes/api');
const AppError = require('./utils/AppError.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// statically serve bundle files when using production build
app.use('/bundle.js', express.static(path.join(__dirname, '../build/bundle.js')));
app.use(/\/[0-9]+\.bundle.js/, express.static(path.join(__dirname, '../build/158.bundle.js')));

// statically serve images
app.use('/images', express.static(path.join(__dirname, '../client/assets/images')));

// GraphQL Server and Middleware
app.use('/graphql', graphQLGeoMiddleWare, graphQLServer);
app.use('/api/graphql', authController.validateToken, graphQLGeoMiddleWare, graphQLServer);

// send non-graphQL requests to appropriate router
app.use('/api', apiRouter);

// serve index.html file
app.get('/*', (req, res, next) => {
  // TODO: Is this necessary with webpack dev server
  return res.status(200).sendFile(path.resolve(__dirname, '../build/index.html'));
});

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
