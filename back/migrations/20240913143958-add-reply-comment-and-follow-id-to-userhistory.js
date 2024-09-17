'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('userhistory', 'ReplyCommentId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'reply_comments',
        key: 'id'
      }
    });

    await queryInterface.addColumn('userhistory', 'FollowId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('userhistory', 'replyCommentId');
    await queryInterface.removeColumn('userhistory', 'followId');
  }
};
