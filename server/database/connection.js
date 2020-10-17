const { Pool } = require('pg');

// require('env2')('./config.env');

require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DB connection not found');
}

const options = {
  connectionString,
  ssl: !connectionString.includes('localhost'),
};

module.exports = new Pool(options);
