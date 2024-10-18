'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      eventDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      eventTime: {
        type: Sequelize.TIME,
        allowNull: false
      },
      userId: {  // Foreign key to User
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',  // Refers to the 'Users' table
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'  // Optional: Delete events if the user is deleted
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
  }
};
