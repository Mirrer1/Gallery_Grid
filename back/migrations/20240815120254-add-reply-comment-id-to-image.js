'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('images', 'ReplyCommentId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'reply_comments',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('images', 'ReplyCommentId');
  }
};
