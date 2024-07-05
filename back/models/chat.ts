import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import User from './user';
import Image from './image';

class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
  declare id: CreationOptional<number>;
  declare content: string;
  declare checked: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Chat.init(
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
        checked: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      },
      {
        modelName: 'Chat',
        tableName: 'chats',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize
      }
    );
  }

  static associate() {
    Chat.belongsTo(User, { as: 'Sender', foreignKey: 'SenderId' });
    Chat.belongsTo(User, { as: 'Receiver', foreignKey: 'ReceiverId' });
    Chat.belongsTo(Image, { as: 'Image', foreignKey: 'ImageId' });
  }
}

export default Chat;
