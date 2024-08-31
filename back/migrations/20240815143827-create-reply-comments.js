'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('reply_comments', 'PostId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'posts',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('reply_comments', 'PostId');
  }
};
