const graphql = require('graphql');
const db = require('../models.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const { ConstructionOutlined } = require('@mui/icons-material');
require('dotenv').config();


const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
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

// "password" varchar(255) NOT NULL,
// "email" varchar(255) NOT NULL UNIQUE,
// "chapter_id" integer NOT NULL,
// "first_name" varchar(255) NOT NULL,
// "last_name" varchar(255) NOT NULL,
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
          .catch(error => console.log(error));
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
        return context.prisma.chapter_items.findMany({
          select: {
            total_received: true,
            items: {
              select: {
                id: true,
                name: true,
                total_needed: true,
                category: true
              }},
          },
          where: {
            chapter_id: chapter.id
          }
        }).then(res=> {
          console.log(res)
          return res
        })
        // return db.query(`SELECT i.id as id, i.name as name, i.category, ci.total_received, i.total_needed
        // FROM chapter_items ci
        // LEFT JOIN items i ON ci.item_id = i.id
        // LEFT JOIN chapters c ON c.id = ci.chapter_id
        // WHERE c.id = $1;`, [chapter.id])
        //   .then(res => res.rows);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(chapter, args) {
        return db.query('SELECT email, first_name, last_name FROM users WHERE chapter_id = ($1);', [chapter.id])
          .then(res => res.rows)
          .catch(error => console.log(error));
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


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    item: {
      type: ItemType,
      args: {
        id: {type: GraphQLInt}
      },
      resolve(parent, args) {
        return db.query('SELECT * FROM items WHRE id = ', args.id)
          .then(res => res.rows[0]);
      }
    },
    chapter:{
      type: ChapterType,
      args: {
        id: {type: GraphQLInt}
      },
      resolve(parent, args) {
        return db.query('SELECT * FROM chapters WHERE id = $1', [args.id])
          .then(res => res.rows[0]);
      }
    },
    user: {
      type: UserType,
      args: {
        email: { type: GraphQLString }
      },
      resolve(parent, args) {
        return db.query('SELECT * FROM users WHERE email = $1;', [args.email])
          .then(res => {
            return res.rows[0];
          });
      }
    },
    items: {
      type: new GraphQLList(ItemType),
      resolve(parent, args){
        return db.query('SELECT * FROM items;')
          .then(res => {
            return res.rows;
          });
      }
    },
    chapters: {
      type: new GraphQLList(ChapterType),
      resolve(parent, args){
        return db.query('SELECT * FROM chapters;')
          .then(res => {
            return res.rows;
          });
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return db.query('SELECT * FROM users;')
          .then(res => {
            return res.rows;
          });
      }
    }
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addChapter: {
      type: ChapterType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        street: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        state: { type: new GraphQLNonNull(GraphQLString) },
        zip: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        longitude: { type: new GraphQLNonNull(GraphQLFloat) },
        latitude: { type: new GraphQLNonNull(GraphQLFloat) }
      },
      resolve(parent, args) {
        return db
          .query(
            'INSERT INTO chapters (name, zip, street, city, state, phone, email, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;',
            [
              args.name,
              args.zip,
              args.street,
              args.city,
              args.state,
              args.phone,
              args.email,
              args.latitude,
              args.longitude,
            ]
          )
          .then((res) => {
            return res.rows[0];
          });
      },
    },
    addItem: {
      type: ItemType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        total_needed: { type: new GraphQLNonNull(GraphQLInt) },
        total_received: { type: new GraphQLNonNull(GraphQLInt) },
        category: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return db
          .query(
            'INSERT INTO items (name, total_received, total_needed, category) VALUES ($1, $2, $3, $4) RETURNING *;',
            [args.name, args.total_needed, args.total_received, args.category]
          )
          .then((res) => {
            return res.rows[0];
          });
      },
    },
    signUp: {
      type: AuthPayload,
      args: {
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        chapter_id: { type: GraphQLInt },
      },
      async resolve(parent, args, context) {
        try {
          const password = await bcrypt.hash(args.password, saltRounds);
          const user = await context.prisma.users.create({
            data: { ...args, password },
          });

          const token = jwt.sign({ email: args.email }, process.env.TOKEN_KEY, {
            expiresIn: '1h',
          });

          return {
            token,
            user,
          };
        } catch (error) {
          throw new AppError(error);
        }
      },
    },
    addUser: {
      type: UserType,
      args: {
        first_name: { type: new GraphQLNonNull(GraphQLString) },
        last_name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        chapter_id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args, context) {
        try {
          const password = await bcrypt.hash(args.password, saltRounds);
          const user = await context.prisma.users.create({
            data: { ...args, password },
          });

          return user;
        } catch (error) {
          throw new AppError(error);
        }
      },
    },
    login: {
      type: AuthPayload,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        try {
          //find email from database with prisma
          const user = await context.prisma.users.findUnique({
            where: {
              email: args.email,
            },
          });
          //compare password
          const result = await bcrypt.compare(args.password, user.password);
          if (!result) {
            throw new Error('Username or password don\'t match');
          }
          //create Token
          const token = jwt.sign({ email: args.email }, process.env.TOKEN_KEY, {
            expiresIn: '1h',
          });
          return {
            token,
            user,
          };
        }
        catch (error){
          throw new AppError(error);
        }
      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});