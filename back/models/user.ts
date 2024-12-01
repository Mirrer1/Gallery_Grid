import Sequelize, {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  CreationOptional,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize';
import Post from './post';
import Alert from './userHistory';
import Chat from './chat';
import Report from './report';
import Comment from './comment';
import Image from './image';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare snsId?: string;
  declare provider?: string;
  declare email: string;
  declare password: string | null;
  declare nickname: string;
  declare desc?: string;
  declare isRecommended: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare Posts?: Post[];
  declare ProfileImage?: Image;

  public addFollowing!: BelongsToManyAddAssociationMixin<User, number>;
  public removeFollowing!: BelongsToManyRemoveAssociationMixin<User, number>;
  public getFollowings!: BelongsToManyGetAssociationsMixin<User>;
  public getFollowers!: BelongsToManyGetAssociationsMixin<User>;
  public getPosts!: HasManyGetAssociationsMixin<Post>;

  static initiate(sequelize: Sequelize.Sequelize) {
    User.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        snsId: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true
        },
        provider: {
          type: Sequelize.STRING(20),
          allowNull: true
        },
        email: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        nickname: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true
        },
        desc: {
          type: Sequelize.STRING(250),
          allowNull: true
        },
        isRecommended: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      },
      {
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
  }

  static associate() {
    User.hasMany(Post);
    User.hasMany(Comment);
    User.hasMany(Alert);
    User.belongsToMany(Post, { through: 'like', as: 'Liked' });
    User.hasMany(Chat, { as: 'SentMessages', foreignKey: 'SenderId' });
    User.hasMany(Chat, { as: 'ReceivedMessages', foreignKey: 'ReceiverId' });
    User.hasMany(Report, { foreignKey: 'ReporterId', as: 'ReportsFiled' });
    User.hasMany(Report, { foreignKey: 'ReportedUserId', as: 'ReportsReceived' });
    User.hasOne(Image, { as: 'ProfileImage', foreignKey: 'UserId' });
    User.belongsToMany(User, {
      through: 'Follow',
      as: 'Followers',
      foreignKey: 'FollowingId'
    });
    User.belongsToMany(User, {
      through: 'Follow',
      as: 'Followings',
      foreignKey: 'FollowerId'
    });
  }
}

export default User;
