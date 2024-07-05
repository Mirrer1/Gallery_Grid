import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import User from './user';
import Post from './post';
import Comment from './comment';

class Report extends Model<InferAttributes<Report>, InferCreationAttributes<Report>> {
  declare id: CreationOptional<number>;
  declare type: string;
  declare content: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Report.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        type: {
          type: Sequelize.STRING(30),
          allowNull: false
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      },
      {
        modelName: 'Report',
        tableName: 'reports',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
  }

  static associate() {
    Report.belongsTo(User, { foreignKey: 'ReporterId', as: 'Reporter' });
    Report.belongsTo(User, { foreignKey: 'ReportedUserId', as: 'ReportedUser' });
    Report.belongsTo(Post, { foreignKey: 'PostId', as: 'ReportedPost' });
    Report.belongsTo(Comment, { foreignKey: 'CommentId', as: 'ReportedComment' });
  }
}

export default Report;
