const graphql = require('graphql');
const db = require('../models.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Query = require ('./graphqlQueries.js');
const Mutations = require('./graphqlMutations.js');

const {
  GraphQLError,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} = graphql;



module.exports = new GraphQLSchema ({
  query: Query,
  mutation: Mutations
});
