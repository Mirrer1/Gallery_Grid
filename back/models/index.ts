import { Sequelize } from 'sequelize';

import User from './user';
import Post from './post';
import Alert from './alert';
import Auth from './auth';
import Chat from './chat';
import Comment from './comment';
import Image from './image';
import Report from './report';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db: any = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = User.initModel(sequelize);
db.Post = Post.initModel(sequelize);
db.Alert = Alert.initModel(sequelize);
db.Auth = Auth.initModel(sequelize);
db.Chat = Chat.initModel(sequelize);
db.Comment = Comment.initModel(sequelize);
db.Image = Image.initModel(sequelize);
db.Report = Report.initModel(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
