import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Report extends Model {
  public type!: string;
  public content!: string;

  static initModel(sequelize: Sequelize): typeof Report {
    Report.init(
      {
        type: {
          type: DataTypes.STRING(30),
          allowNull: false
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false
        }
      },
      {
        modelName: 'Report',
        tableName: 'reports',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
    return Report;
  }

  static associate(db: any) {
    db.Report.belongsTo(db.User, { foreignKey: 'ReporterId', as: 'Reporter' });
    db.Report.belongsTo(db.User, {
      foreignKey: 'ReportedUserId',
      as: 'ReportedUser'
    });
    db.Report.belongsTo(db.Post, { foreignKey: 'PostId', as: 'ReportedPost' });
    db.Report.belongsTo(db.Comment, {
      foreignKey: 'CommentId',
      as: 'ReportedComment'
    });
  }
}
