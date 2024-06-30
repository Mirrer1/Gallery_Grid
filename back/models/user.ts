import { DataTypes, Model, Sequelize } from 'sequelize';

export default class User extends Model {
  public email!: string;
  public password!: string;
  public nickname!: string;
  public desc?: string;
  public isRecommended!: boolean;

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        email: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true
        },
        desc: {
          type: DataTypes.STRING(250),
          allowNull: true
        },
        isRecommended: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        }
      },
      {
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
    return User;
  }

  static associate(db: any) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Alert);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.hasMany(db.Chat, { as: 'SentMessages', foreignKey: 'SenderId' });
    db.User.hasMany(db.Chat, {
      as: 'ReceivedMessages',
      foreignKey: 'ReceiverId'
    });
    db.User.hasMany(db.Report, {
      foreignKey: 'ReporterId',
      as: 'ReportsFiled'
    });
    db.User.hasMany(db.Report, {
      foreignKey: 'ReportedUserId',
      as: 'ReportsReceived'
    });
    db.User.belongsTo(db.Image, {
      as: 'ProfileImage',
      foreignKey: 'ProfileImageId'
    });
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followers',
      foreignKey: 'FollowingId'
    });
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followings',
      foreignKey: 'FollowerId'
    });
  }
}
