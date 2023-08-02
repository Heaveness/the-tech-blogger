// Import necessary modules.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Comment model.
class Comment extends Model {}

// Initialize the Comment model's schema.
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,  // Integer type.
      allowNull: false,  // Must have a value.
      primaryKey: true,  // This is a primary key.
      autoIncrement: true,  // Auto-increment the value.
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
    post_id: {
      type: DataTypes.INTEGER,  // Integer type.
      allowNull: false,  // Must have a value.
      references: {  // This is a foreign key.
        model: 'post',  // References the 'post' model.
        key: 'id',  // The 'id' field of the 'post' model.
      },
    },
  },
  {
    sequelize,  // Connection to the database.
    timestamps: true,  // Enable timestamps.
    freezeTableName: true,  // Prevent Sequelize from pluralizing the model name.
    underscored: true,  // Use underscores in the auto generated column names.
    modelName: 'comment',  // The name of the model.
  }
);

// Export the Comment model to be used in other parts of the application.
module.exports = Comment;
