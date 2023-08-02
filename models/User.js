// Import necessary modules.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Define the User model.
class User extends Model {
  // Method to check if the user's entered password matches the hashed password.
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);  // Compare the entered password to the hashed password.
  }
}

// Initialize the User model's schema.
User.init(
  {
    id: {
      type: DataTypes.INTEGER,  // Integer type.
      allowNull: false,  // Must have a value.
      primaryKey: true,  // This is a primary key.
      autoIncrement: true,  // Auto-increment the value.
    },
    username: {
      type: DataTypes.STRING,  // String type.
      allowNull: false,  // Must have a value.
      unique: true,  // Value must be unique.
    },
    email: {
      type: DataTypes.STRING,  // String type.
      allowNull: false,  // Must have a value.
      unique: true,  // Value must be unique.
      validate: {
        isEmail: true,  // Value must be a valid email address.
      },
    },
    password: {
      type: DataTypes.STRING,  // String type.
      allowNull: false,  // Must have a value.
      validate: {
        len: [8],  // Value must be at least 8 characters long.
      },
    },
  },
  {
    hooks: {
      // Before creating a new User, hash their password.
      beforeCreate: async (userData) => {
        userData.password = await bcrypt.hash(userData.password, 10);  // Hash the password using bcrypt.
        return userData;
      },
      // Before updating a User, if their password was changed, hash the new password.
      beforeUpdate: async (userData) => {
        if (userData.password) {
          userData.password = await bcrypt.hash(userData.password, 10);  // Hash the password using bcrypt.
        }
        return userData;
      },
    },
    sequelize,  // Connection to the database.
    timestamps: false,  // Disable timestamps.
    freezeTableName: true,  // Prevent Sequelize from pluralizing the model name.
    underscored: true,  // Use underscores in the auto generated column names.
    modelName: 'user',  // The name of the model.
  }
);

// Export the User model to be used in other parts of the application.
module.exports = User;
