const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./models/graphqlSchema');
const cors = require('cors');
const { locatedError } = require('graphql');
const chapterMiddleware = require('./graphQLMiddlewares/chapterMiddleware');
const prisma = require('./models/context');
const app = express();

// global middleware
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  if (req.body.query?.split(' ')[1] === 'addChapter') {
    await chapterMiddleware.getGeocode(req, res, next);
    return next();
  }
  else return next();
});

app.use('/graphql', graphqlHTTP(async (request, response) => ({
  schema: schema,
  graphiql: true,
  context: {
    prisma,
    request,
    response
  },
  customFormatErrorFn: (err) => {
    if (response.statusCode === 200) response.status(500);
    err = locatedError(err);
    console.warn(err);
    return err;
  }
}))
);

module.exports = app.listen(4000);