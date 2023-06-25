const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

const Post = sequelize.define('Post', {
  // Define the attributes/columns of the Post model
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = Post;
