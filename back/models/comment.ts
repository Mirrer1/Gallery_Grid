import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import User from './user';
import Post from './post';
import Alert from './alert';
import Report from './report';
import Image from './image';
import ReplyComment from './replyComment';

class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
  declare id: CreationOptional<number>;
  declare content: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare PostId: number;
  declare UserId: number;
  declare isDeleted: CreationOptional<boolean>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Comment.init(
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
        PostId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        UserId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        isDeleted: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      },
      {
        modelName: 'Comment',
        tableName: 'comments',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize
      }
    );
  }

  static associate() {
    Comment.belongsTo(User);
    Comment.belongsTo(Post);
    Comment.hasMany(Alert);
    Comment.hasMany(Report, { foreignKey: 'CommentId', as: 'Reports' });
    Comment.hasOne(Image, { as: 'CommentImage', foreignKey: 'CommentId' });
    Comment.hasMany(ReplyComment, { foreignKey: 'CommentId', as: 'Replies' });
  }
}

export default Comment;
