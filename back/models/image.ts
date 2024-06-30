import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Image extends Model {
  public src!: string;

  static initModel(sequelize: Sequelize): typeof Image {
    Image.init(
      {
        src: {
          type: DataTypes.STRING(200),
          allowNull: false
        }
      },
      {
        modelName: 'Image',
        tableName: 'images',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
    return Image;
  }

  static associate(db: any) {
    db.Image.belongsTo(db.Post);
    db.Image.hasOne(db.User, {
      as: 'ProfileImage',
      foreignKey: 'ProfileImageId'
    });
    db.Image.hasMany(db.Chat, { as: 'ChatMessages', foreignKey: 'ImageId' });
  }
}
