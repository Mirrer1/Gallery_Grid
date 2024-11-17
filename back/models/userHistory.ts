import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import Post from './post';
import Comment from './comment';
import User from './user';
import ReplyComment from './replyComment';

class UserHistory extends Model<InferAttributes<UserHistory>, InferCreationAttributes<UserHistory>> {
  declare id: CreationOptional<number>;
  declare type: 'like' | 'comment' | 'replyComment' | 'follow';
  declare UserId: number | null;
  declare PostId: number | null;
  declare CommentId: number | null;
  declare ReplyCommentId: number | null;
  declare FollowId: number | null;
  declare AlerterId: number | null;
  declare AlertedId: number | null;
  declare isRead: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    UserHistory.init(
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
        UserId: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        PostId: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        CommentId: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        ReplyCommentId: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        FollowId: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        AlerterId: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        AlertedId: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        isRead: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      },
      {
        modelName: 'UserHistory',
        tableName: 'userhistory',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
  }

  static associate() {
    UserHistory.belongsTo(Post);
    UserHistory.belongsTo(Comment);
    UserHistory.belongsTo(ReplyComment);
    UserHistory.belongsTo(User, { as: 'Follow', foreignKey: 'FollowId' });
    UserHistory.belongsTo(User, { as: 'Alerter', foreignKey: 'AlerterId' });
    UserHistory.belongsTo(User, { as: 'Alerted', foreignKey: 'AlertedId' });
  }
}

export default UserHistory;
