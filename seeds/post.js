// Import the Post model.
const { Post } = require('../models');

// Define an array of posts to be seeded.
const postData = [
  {
    title: 'First Post',
    content: 'This is the content of the first post.',
    user_id: 1,
  },
  {
    title: 'Second Post',
    content: 'This is the content of the second post.',
    user_id: 2,
  },
];

// Define a function to seed the posts using bulkCreate.
const seedPosts = () => Post.bulkCreate(postData);

// Export the seedPosts function.
module.exports = seedPosts;
