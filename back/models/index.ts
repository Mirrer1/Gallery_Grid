import { Sequelize } from 'sequelize';

import User from './user';
import Post from './post';
import Alert from './alert';
import Auth from './auth';
import Chat from './chat';
import Comment from './comment';
import Image from './image';
import Report from './report';
import config from '../config/config';

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];
const sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, envConfig);

export interface DatabaseModels {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  User: typeof User;
  Post: typeof Post;
  Alert: typeof Alert;
  Auth: typeof Auth;
  Chat: typeof Chat;
  Comment: typeof Comment;
  Image: typeof Image;
  Report: typeof Report;
}

const db: DatabaseModels = {
  sequelize: new Sequelize(envConfig.database, envConfig.username, envConfig.password, envConfig),
  Sequelize,
  User: User.initModel(sequelize),
  Post: Post.initModel(sequelize),
  Alert: Alert.initModel(sequelize),
  Auth: Auth.initModel(sequelize),
  Chat: Chat.initModel(sequelize),
  Comment: Comment.initModel(sequelize),
  Image: Image.initModel(sequelize),
  Report: Report.initModel(sequelize)
};

(Object.keys(db) as (keyof DatabaseModels)[]).forEach(modelName => {
  const model = db[modelName];
  if ('associate' in model) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
