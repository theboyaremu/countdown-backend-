'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      User.hasMany(models.Event, {
        foreignKey: 'userId',
        as: 'events' // Alias for the association
      });
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false // Make sure to set this as needed
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Ensures emails are unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false // Password should not be null
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
