module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('alerts', 'userhistory');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('userhistory', 'alerts');
  }
};
