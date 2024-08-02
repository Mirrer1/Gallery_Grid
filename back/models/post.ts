import Sequelize, {
  CreationOptional,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize';
import Image from './image';
import Comment from './comment';
import Alert from './alert';
import User from './user';
import Report from './report';

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare id: CreationOptional<number>;
  declare content: string;
  declare location?: string;
  declare UserId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public addImages!: HasManyAddAssociationsMixin<Image, number>;
  public addImage!: HasManyAddAssociationMixin<Image, number>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Post.init(
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
        location: {
          type: Sequelize.STRING(30),
          allowNull: true
        },
        UserId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      },
      {
        modelName: 'Post',
        tableName: 'posts',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize
      }
    );
  }

  static associate() {
    Post.hasMany(Comment);
    Post.hasMany(Image);
    Post.hasMany(Alert);
    Post.belongsTo(User, { foreignKey: 'UserId' });
    Post.hasMany(Report, { foreignKey: 'PostId', as: 'Reports' });
    Post.belongsToMany(User, { through: 'Like', as: 'Likers' });
  }
}

export default Post;
