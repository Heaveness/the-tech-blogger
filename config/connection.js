// Import the required packages and libraries.
require('dotenv').config();
const Sequelize = require('sequelize');

// Create a new Sequelize instance with the appropriate configuration.
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      // Enable support for decimal numbers.
      decimalNumbers: true,
    },
    logging: false, // Set to true if you want to see SQL queries in the console.
  }
);

module.exports = sequelize;
