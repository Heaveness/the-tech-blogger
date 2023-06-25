const { User } = require('../models');
const bcrypt = require('bcrypt');

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

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
