import Sequelize from 'sequelize';

import configObj from '../config/config';
import User from './user';
import Post from './post';
import UserHistory from './userHistory';
import Auth from './auth';
import Chat from './chat';
import Comment from './comment';
import Image from './image';
import Report from './report';
import ReplyComment from './replyComment';

const env = (process.env.NODE_ENV as 'production' | 'test') || 'development';
const config = configObj[env];

export const sequelize = new Sequelize.Sequelize(config.database, config.username, config.password, config);

User.initiate(sequelize);
Post.initiate(sequelize);
UserHistory.initiate(sequelize);
Auth.initiate(sequelize);
Chat.initiate(sequelize);
Comment.initiate(sequelize);
Image.initiate(sequelize);
Report.initiate(sequelize);
ReplyComment.initiate(sequelize);

User.associate();
Post.associate();
UserHistory.associate();
Auth.associate();
Chat.associate();
Comment.associate();
Image.associate();
Report.associate();
ReplyComment.associate();
