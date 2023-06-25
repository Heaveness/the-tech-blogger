const { Sequelize } = require('sequelize');
require('dotenv').config();

// Retrieve the environment variables
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

// Configure the database connection
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false, // Set to true if you want to see SQL queries in the console
});

module.exports = sequelize;
