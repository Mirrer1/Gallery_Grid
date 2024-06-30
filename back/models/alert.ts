import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Alert extends Model {
  public type!: string;

  static initModel(sequelize: Sequelize): typeof Alert {
    Alert.init(
      {
        type: {
          type: DataTypes.STRING(30),
          allowNull: false
        }
      },
      {
        modelName: 'Alert',
        tableName: 'alerts',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
    return Alert;
  }

  static associate(db: any) {
    db.Alert.belongsTo(db.Post);
    db.Alert.belongsTo(db.Comment);
    db.Alert.belongsTo(db.User, { as: 'Alerter' });
    db.Alert.belongsTo(db.User, { as: 'Alerted' });
  }
}
