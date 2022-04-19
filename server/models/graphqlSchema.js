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
        WHERE c.id = $1;`, [chapter.id])
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
          })
          .catch(err => err);
      },
    },
    addNeed: {
      type: ItemType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        total_needed: { type: new GraphQLNonNull(GraphQLInt) },
        total_received: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        return db
          .query(
            'INSERT INTO items (name, category, total_needed, total_received) VALUES ($1, $2, $3, $4) RETURNING *;',
            [args.name, args.category, args.total_needed, args.total_received]
          )
          .then((res) => {
            return res.rows[0];
          })
          .catch(err => err);
      },
    },
    updateItem: {
      type: ChapterType,
      args: {
        item_id: { type: new GraphQLNonNull(GraphQLInt) },
        total_received: { type: new GraphQLNonNull(GraphQLInt) },
        chapter_id: { type: GraphQLInt }
      },
      async resolve(parent, args, context) {
        try {
          const chapterItem = await context.prisma.chapter_items.upsert({
            create: {
              chapter_id: args.chapter_id,
              item_id: args.item_id,
              total_received: args.total_received,
            },
            update: {
              total_received: {
                increment: args.total_received,
              },
            },
            where: {
              'chapter_id_item_id': {
                chapter_id: args.chapter_id,
                item_id: args.item_id
              }
            },
            include: {
              chapters: true
            }
          });

          const item = await context.prisma.items.update({
            data: {
              total_received: {
                increment: args.total_received,
              }
            },
            where: {
              id: args.item_id,
            }
          });

          return chapterItem.chapters;
        }
        catch (err) {
          return err;
        }
      }
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
          return error;
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
          return error;
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

          if (!user) {
            context.response.status(404);
            throw new GraphQLError('No user found');
          }

          //compare password
          const result = await bcrypt.compare(args.password, user.password);
          if (!result) {
            context.response.status(403);
            throw new GraphQLError('Username or password don\'t match');
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
          return error;
        }
      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});