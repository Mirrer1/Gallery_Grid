'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('images', 'type', {
      type: Sequelize.STRING(50),
      allowNull: false
    });
    await queryInterface.addColumn('images', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('images', 'type');
    await queryInterface.removeColumn('images', 'UserId');
  }
};
