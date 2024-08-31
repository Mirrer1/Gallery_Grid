'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reply_comments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      CommentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'comments',
          key: 'id'
        }
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reply_comments');
  }
};
