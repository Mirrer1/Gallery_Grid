'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('comments', 'parentId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('comments', 'parentId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
