// Import the Comment model.
const { Comment } = require('../models');

// Define an array of comments to be seeded.
const commentData = [
  {
    content: 'This is a comment on the first post.',
    user_id: 2,
    post_id: 1,
  },
  {
    content: 'This is a comment on the second post.',
    user_id: 1,
    post_id: 2,
  },
];

// Define a function to seed the comments using bulkCreate.
const seedComments = () => Comment.bulkCreate(commentData);

// Export the seedComments function.
module.exports = seedComments;
