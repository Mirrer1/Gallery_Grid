import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import Post from './post';
import Comment from './comment';
import User from './user';

class UserHistory extends Model<InferAttributes<UserHistory>, InferCreationAttributes<UserHistory>> {
  declare id: CreationOptional<number>;
  declare type: string;
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
    UserHistory.belongsTo(User, { as: 'Alerter', foreignKey: 'alerterId' });
    UserHistory.belongsTo(User, { as: 'Alerted', foreignKey: 'alertedId' });
  }
}

export default UserHistory;
