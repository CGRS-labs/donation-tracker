const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./models/graphqlSchema');
const { context } = require('./models/context');

app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
  context: context,
}));

app.listen(4000);