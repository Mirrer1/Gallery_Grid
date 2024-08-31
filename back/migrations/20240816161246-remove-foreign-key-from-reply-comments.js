'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('reply_comments', 'reply_comments_PostId_foreign_idx');

    await queryInterface.changeColumn('reply_comments', 'PostId', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('reply_comments', 'PostId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addConstraint('reply_comments', {
      fields: ['PostId'],
      type: 'foreign key',
      name: 'reply_comments_PostId_foreign_idx',
      references: {
        table: 'posts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  }
};
