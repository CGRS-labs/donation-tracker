// const connectionString = process.env.PG_URI;
// const pgp = require('pg-promise')();
// const db = pgp(connectionString);

// module.exports = {db};

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.resolve(__dirname, '../.env')});

const { Pool } = require('pg');

// const PG_URI = process.env.PG_URI;
const PG_URI = 'postgres://spkulhzl:2qj-Z-rKPPrezjXJwH-lFS8dMmlyvpIy@ziggy.db.elephantsql.com/spkulhzl'

const pool = new Pool({
  connectionString: PG_URI,
  max: 3,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
