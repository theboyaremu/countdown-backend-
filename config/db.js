// sequelize.js
const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("../models/user.js");
const EventModel = require("../models/event.js")

const sequelize = new Sequelize('counter', 'postgres', 'Tommyz2004', {
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: false,
});

// Sync models with the database
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

// Initialize models
const User = UserModel(sequelize, DataTypes);
const Event = EventModel(sequelize, DataTypes)

module.exports = {
  User,
  Event
};
