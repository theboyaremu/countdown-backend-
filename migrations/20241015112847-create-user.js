'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the Users table exists
    const tableExists = await queryInterface.sequelize.query("SELECT * FROM information_schema.tables WHERE table_name = 'Users'");

    if (tableExists[0].length === 0) {
      // Create Users table if it doesn't exist
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true // Ensures emails are unique
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false // Ensure password is required
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Sets the default to current timestamp
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Set to current timestamp when created
        }
      });
    } else {
      // If the table exists, you can check for specific columns if needed
      const columnExists = await queryInterface.sequelize.query("SELECT column_name FROM information_schema.columns WHERE table_name='Users' AND column_name='password'");

      if (columnExists[0].length === 0) {
        // Add the password column only if it doesn't exist
        await queryInterface.addColumn('Users', 'password', {
          type: Sequelize.STRING,
          allowNull: false // Ensure password is required
        });
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the password column if it exists
    const columnExists = await queryInterface.sequelize.query("SELECT column_name FROM information_schema.columns WHERE table_name='Users' AND column_name='password'");
    
    if (columnExists[0].length > 0) {
      await queryInterface.removeColumn('Users', 'password');
    }
    
    // Optionally, drop the Users table if desired
    // await queryInterface.dropTable('Users');
  }
};
