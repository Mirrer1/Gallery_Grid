import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import Post from './post';
import User from './user';
import Chat from './chat';

class Image extends Model<InferAttributes<Image>, InferCreationAttributes<Image>> {
  declare id: CreationOptional<number>;
  declare src: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Image.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        src: {
          type: Sequelize.STRING(200),
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      },
      {
        modelName: 'Image',
        tableName: 'images',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
  }

  static associate() {
    Image.belongsTo(Post);
    Image.hasOne(User, {
      as: 'ProfileImage',
      foreignKey: 'ProfileImageId'
    });
    Image.hasMany(Chat, {
      as: 'ChatMessages',
      foreignKey: 'ImageId'
    });
  }
}

export default Image;
