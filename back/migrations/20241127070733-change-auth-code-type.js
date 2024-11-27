'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('auths', 'code', {
      type: Sequelize.STRING(6),
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('auths', 'code', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
