const graphql = require('graphql');
const db = require('../models.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {ItemType, ChapterType, UserType, AuthPayload} = require ('./graphqlTypes.js');

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

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      item: {
        type: ItemType,
        args: {
          id: {type: GraphQLInt}
        },
        resolve(parent, args, context) {
          return db.query('SELECT * FROM items WHERE id = $1', [args.id])
            .then(res => {
              if (!res.rows[0]) {
                context.response.status(404);
                throw new GraphQLError(`Error with item query: Item with id ${args.id} not found.`);
              }
              return res.rows[0];
            })
            .catch(err => err);
        }
      },
      chapter:{
        type: ChapterType,
        args: {
          id: {type: GraphQLInt}
        },
        resolve(parent, args, context) {
          return db.query('SELECT * FROM chapters WHERE id = $1', [args.id])
            .then(res => {
              if (!res.rows[0]) {
                context.response.status(404);
                throw new GraphQLError(`Error with chapter query: chapter with id ${args.id} not found.`);
              }
              return res.rows[0];
            })
            .catch(err => err);
        }
      },
      user: {
        type: UserType,
        args: {
          email: { type: GraphQLString }
        },
        resolve(parent, args, context) {
          return db.query('SELECT * FROM users WHERE email = $1;', [args.email])
            .then(res => {
              if (!res.rows[0]) {
                context.response.status(404);
                throw new GraphQLError(`Error with users query: User with email ${args.email} not found.`);
              }
              return res.rows[0];
            })
            .catch(err =>  err);
        }
      },
      items: {
        type: new GraphQLList(ItemType),
        resolve(parent, args){
          return db.query('SELECT * FROM items;')
            .then(res => {
              return res.rows;
            })
            .catch(err => err);
        }
      },
      chapters: {
        type: new GraphQLList(ChapterType),
        resolve(parent, args){
          return db.query('SELECT * FROM chapters;')
            .then(res => {
              return res.rows;
            })
            .catch(err => err);
        }
      },
      users: {
        type: new GraphQLList(UserType),
        resolve(parent, args, context) {
          return db.query('SELECT * FROM users;')
            .then(res => {
              return res.rows;
            })
            .catch(err => {
              const error = new GraphQLError(`Error with users query: ${err}`);
              context.response.status(500);
              return error;
            });
        }
      }
    },
  });

  module.exports = RootQuery;
