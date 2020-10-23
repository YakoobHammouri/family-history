const { Pool } = require('pg');
process.NODE_TLS_REJECT_UNAUTHORIZED = 0;
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
