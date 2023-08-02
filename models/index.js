// Import necessary modules.
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define associations between models.
User.hasMany(Post, {  // A User has many Posts.
  foreignKey: 'user_id',  // The foreign key in the Post model is 'user_id'.
  onDelete: 'CASCADE',  // If a User is deleted, also delete their Posts.
});

User.hasMany(Comment, {  // A User has many Comments.
  foreignKey: 'user_id',  // The foreign key in the Comment model is 'user_id'.
  onDelete: 'CASCADE',  // If a User is deleted, also delete their Comments.
});

Post.belongsTo(User, {  // A Post belongs to a User.
  foreignKey: 'user_id',  // The foreign key in the Post model is 'user_id'.
});

Post.hasMany(Comment, {  // A Post has many Comments.
  foreignKey: 'post_id',  // The foreign key in the Comment model is 'post_id'.
  onDelete: 'CASCADE',  // If a Post is deleted, also delete its Comments.
});

Comment.belongsTo(User, {  // A Comment belongs to a User.
  foreignKey: 'user_id',  // The foreign key in the Comment model is 'user_id'.
});

Comment.belongsTo(Post, {  // A Comment belongs to a Post.
  foreignKey: 'post_id',  // The foreign key in the Comment model is 'post_id'.
});

// Export the models to be used in other parts of the application.
module.exports = { User, Post, Comment };
