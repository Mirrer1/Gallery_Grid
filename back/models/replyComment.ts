import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import User from './user';
import Comment from './comment';
import Image from './image';
import Post from './post';

class ReplyComment extends Model<InferAttributes<ReplyComment>, InferCreationAttributes<ReplyComment>> {
  declare id: CreationOptional<number>;
  declare content: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare CommentId: number;
  declare PostId: number;
  declare UserId: number;

  static initiate(sequelize: Sequelize.Sequelize) {
    ReplyComment.init(
      {
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
          allowNull: false
        },
        PostId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        UserId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      },
      {
        modelName: 'ReplyComment',
        tableName: 'reply_comments',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize
      }
    );
  }

  static associate() {
    ReplyComment.belongsTo(User);
    ReplyComment.belongsTo(Post);
    ReplyComment.belongsTo(Comment, { foreignKey: 'CommentId' });
    ReplyComment.hasOne(Image, { as: 'ReplyImage', foreignKey: 'ReplyCommentId' });
  }
}

export default ReplyComment;
