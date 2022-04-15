// const connectionString = process.env.PG_URI;
// const pgp = require('pg-promise')();
// const db = pgp(connectionString);

require('dotenv').config();


const { Pool } = require('pg');

const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
  max: 6,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
