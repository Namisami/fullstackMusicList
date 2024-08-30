const pg = require('pg-promise')();

const db = pg({
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mus_list',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_HOST || 5432,
  encoding: 'utf8',
});

module.exports = db;
