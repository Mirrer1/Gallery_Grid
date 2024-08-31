module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('images', 'CommentId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'comments',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('images', 'CommentId');
  }
};
