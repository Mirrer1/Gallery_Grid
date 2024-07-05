import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import Post from './post';
import Alert from './alert';
import Chat from './chat';
import Report from './report';
import Comment from './comment';
import Image from './image';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare nickname: string;
  declare desc?: string;
  declare isRecommended: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    User.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false
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
    User.belongsToMany(Post, { through: 'Like', as: 'Liked' });
    User.hasMany(Chat, { as: 'SentMessages', foreignKey: 'SenderId' });
    User.hasMany(Chat, { as: 'ReceivedMessages', foreignKey: 'ReceiverId' });
    User.hasMany(Report, { foreignKey: 'ReporterId', as: 'ReportsFiled' });
    User.hasMany(Report, { foreignKey: 'ReportedUserId', as: 'ReportsReceived' });
    User.belongsTo(Image, { as: 'ProfileImage', foreignKey: 'ProfileImageId' });
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
