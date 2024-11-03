const { Pool } = require('pg');
require('dotenv').config;

const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_SECRET = process.env.DATABASE_SECRET;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_NAME = process.env.DATABASE_NAME;

module.exports = new Pool({
  connectionString: `postgresql://${DATABASE_USER}:${DATABASE_SECRET}@${DATABASE_HOST}/${DATABASE_NAME}`,
});
