import { DataTypes, Model, Sequelize } from 'sequelize';
import { DatabaseModels } from 'models';

export default class Comment extends Model {
  public content!: string;

  static initModel(sequelize: Sequelize): typeof Comment {
    Comment.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false
        }
      },
      {
        modelName: 'Comment',
        tableName: 'comments',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize
      }
    );
    return Comment;
  }

  static associate(db: DatabaseModels) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
    db.Comment.hasMany(db.Alert);
    db.Comment.hasMany(db.Report, { foreignKey: 'CommentId', as: 'Reports' });
  }
}
