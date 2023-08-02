// Import the seed functions and the sequelize connection.
const seedUsers = require('./user');
const seedPosts = require('./post');
const seedComments = require('./comment');
const sequelize = require('../config/connection');

// Define an async function to seed all data.
const seedAll = async () => {
  // Sync the database.
  await sequelize.sync({ force: true });

  // Call the seed functions.
  await seedUsers();
  await seedPosts();
  await seedComments();

  // Exit the process.
  process.exit(0);
};

// Call the seedAll function.
seedAll();
