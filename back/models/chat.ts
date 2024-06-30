import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Chat extends Model {
  public content!: string;
  public checked!: boolean;

  static initModel(sequelize: Sequelize): typeof Chat {
    Chat.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        checked: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        }
      },
      {
        modelName: 'Chat',
        tableName: 'chats',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize
      }
    );
    return Chat;
  }

  static associate(db: any) {
    db.Chat.belongsTo(db.User, { as: 'Sender', foreignKey: 'SenderId' });
    db.Chat.belongsTo(db.User, { as: 'Receiver', foreignKey: 'ReceiverId' });
    db.Chat.belongsTo(db.Image, { as: 'Image', foreignKey: 'ImageId' });
  }
}
