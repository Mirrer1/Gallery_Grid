'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('userhistory', 'alertedId', 'AlertedId');
    await queryInterface.renameColumn('userhistory', 'alerterId', 'AlerterId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('userhistory', 'AlertedId', 'alertedId');
    await queryInterface.renameColumn('userhistory', 'AlerterId', 'alerterId');
  }
};
