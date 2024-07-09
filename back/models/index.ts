import Sequelize from 'sequelize';

import configObj from '../config/config';
import User from './user';
import Post from './post';
import Alert from './alert';
import Auth from './auth';
import Chat from './chat';
import Comment from './comment';
import Image from './image';
import Report from './report';

const env = (process.env.NODE_ENV as 'production' | 'test') || 'development';
const config = configObj[env];

export const sequelize = new Sequelize.Sequelize(config.database, config.username, config.password, config);

User.initiate(sequelize);
Post.initiate(sequelize);
Alert.initiate(sequelize);
Auth.initiate(sequelize);
Chat.initiate(sequelize);
Comment.initiate(sequelize);
Image.initiate(sequelize);
Report.initiate(sequelize);

User.associate();
Post.associate();
Alert.associate();
Auth.associate();
Chat.associate();
Comment.associate();
Image.associate();
Report.associate();