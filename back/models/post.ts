import { DataTypes, Model, Sequelize } from 'sequelize';
import { DatabaseModels } from 'models';

export default class Post extends Model {
  public content!: string;
  public location?: string;

  static initModel(sequelize: Sequelize): typeof Post {
    Post.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        location: {
          type: DataTypes.STRING(30),
          allowNull: true
        }
      },
      {
        modelName: 'Post',
        tableName: 'posts',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize
      }
    );
    return Post;
  }

  static associate(db: DatabaseModels) {
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.hasMany(db.Alert);
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Report, { foreignKey: 'PostId', as: 'Reports' });
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
  }
}
