'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('userhistory', 'replyCommentId', 'ReplyCommentId');
    await queryInterface.renameColumn('userhistory', 'followId', 'FollowId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('userhistory', 'REPLY_COMMENT_ID', 'replyCommentId');
    await queryInterface.renameColumn('userhistory', 'FOLLOW_ID', 'followId');
  }
};
