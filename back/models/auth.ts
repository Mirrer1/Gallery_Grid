import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Auth extends Model {
  public email!: string;
  public code!: number;

  static initModel(sequelize: Sequelize): typeof Auth {
    Auth.init(
      {
        email: {
          type: DataTypes.STRING(30),
          allowNull: false
        },
        code: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
      {
        modelName: 'Auth',
        tableName: 'auths',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
    return Auth;
  }

  static associate(db: any) {}
}
