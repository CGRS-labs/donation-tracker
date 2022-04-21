const graphql = require('graphql');
const db = require('../models.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();


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


const AuthPayload = new GraphQLObjectType({
  name: 'AuthPayload',
  fields: () => ({
    token: { type: GraphQLString },
    user: { type: UserType }
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: ( ) => ({
    first_name: { type: GraphQLString},
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    chapter_id: { type: GraphQLInt },
    chapter: {
      type: ChapterType,
      resolve(user, args){
        return db.query(`SELECT *
          FROM chapters
          WHERE id = $1;`, [user.chapter_id])
          .then(res => res.rows[0])
          .catch(error => error);
      }
    }
  })
});

const ChapterType = new GraphQLObjectType({
  name: 'Chapter',
  fields: ( ) => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLInt },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    longitude: { type: GraphQLFloat },
    latitude: { type: GraphQLFloat},
    items: {
      type: new GraphQLList(ItemType),
      async resolve(chapter, args, context ){

        return db.query(`SELECT i.id as id, i.name as name, i.category, ci.total_received, i.total_needed
          FROM chapter_items ci
          LEFT JOIN items i ON ci.item_id = i.id
          LEFT JOIN chapters c ON c.id = ci.chapter_id
          WHERE c.id = $1 ORDER BY i.id;`, [chapter.id])
          .then(res => res.rows)
          .catch(err => err);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(chapter, args) {
        return db.query('SELECT email, first_name, last_name FROM users WHERE chapter_id = ($1);', [chapter.id])
          .then(res => res.rows)
          .catch(error => error);
      }
    }
  })
});


const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: ( ) => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    total_needed: { type: GraphQLInt },
    total_received: { type: GraphQLInt},
    category: { type: GraphQLString },
  })
});

module.exports = {
  ItemType,
  ChapterType,
  UserType,
  AuthPayload,
};