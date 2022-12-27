'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID
      },
      title: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      completed: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      user_id: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'accounts',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('tasks')
  }
};
