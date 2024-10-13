module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('userhistory', 'isRead', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('userhistory', 'isRead');
  }
};
