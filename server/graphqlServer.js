const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./models/graphqlSchema');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP(async (request, response) => ({
  schema: schema,
  graphiql: true,
  context: {
    prisma,
    request
  },
}))
);

module.exports = app.listen(4000);