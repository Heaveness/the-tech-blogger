// Import necessary modules.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Post model.
class Post extends Model {}

// Initialize the Post model's schema.
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,  // Integer type.
      allowNull: false,  // Must have a value.
      primaryKey: true,  // This is a primary key.
      autoIncrement: true,  // Auto-increment the value.
    },
    title: {
      type: DataTypes.STRING,  // String type.
      allowNull: false,  // Must have a value.
    },
    content: {
      type: DataTypes.TEXT,  // Text type.
      allowNull: false,  // Must have a value.
    },
    user_id: {
      type: DataTypes.INTEGER,  // Integer type.
      allowNull: false,  // Must have a value.
      references: {  // This is a foreign key.
        model: 'user',  // References the 'user' model.
        key: 'id',  // The 'id' field of the 'user' model.
      },
    },
  },
  {
    sequelize,  // Connection to the database.
    timestamps: true,  // Enable timestamps.
    freezeTableName: true,  // Prevent Sequelize from pluralizing the model name.
    underscored: true,  // Use underscores in the auto generated column names.
    modelName: 'post',  // The name of the model.
  }
);

// Export the Post model to be used in other parts of the application.
module.exports = Post;
