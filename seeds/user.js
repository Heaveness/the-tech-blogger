// Import the User model and the bcrypt library.
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Define an array of users to be seeded. Passwords are hashed using bcrypt.
const userData = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('password456', 10),
  },
];

// Define a function to seed the users using bulkCreate.
const seedUsers = () => User.bulkCreate(userData);

// Export the seedUsers function.
module.exports = seedUsers;
