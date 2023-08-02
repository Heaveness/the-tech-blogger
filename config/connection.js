// Import the required packages and libraries.
require('dotenv').config();  // Load environment variables from a .env file into process.env.
const Sequelize = require('sequelize');  // Import Sequelize library.
const url = require('url');

let sequelize;

// The configuration details are loaded from environment variables.
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  const sequelize = new Sequelize(
    process.env.DB_NAME,  // Name of the database.
    process.env.DB_USER,  // User name for database.
    process.env.DB_PASSWORD,  // Password for database user.
    {
      host: process.env.DB_HOST || 'localhost',  // Database host.
      port: process.env.DB_PORT || 3306,  // Database port.
      dialect: 'mysql',  // Database dialect.
      dialectOptions: {
        decimalNumbers: true,  // Enable support for decimal numbers.
      },
      logging: false, // Set to true if you want to see SQL queries in the console.
    }
  )
};

// Export the sequelize instance to be used in other parts of the application.
module.exports = sequelize;
