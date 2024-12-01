import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import cors from 'cors';
import hpp from 'hpp';

import userRouter from './routes/user';
import postRouter from './routes/post';
import postsRouter from './routes/posts';
import mailRouter from './routes/mail';
import passportConfig from './passport';
import { sequelize } from './models';

dotenv.config();
const app = express();
passportConfig();

sequelize
  .sync()
  .then(() => {
    console.log('Database Connection Successful!');
  })
  .catch(err => {
    console.error(err);
  });

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: 'https://gallerygrd.com',
      credentials: true
    })
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true
    })
  );
}

app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    proxy: process.env.NODE_ENV === 'production' && true,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      domain: process.env.NODE_ENV === 'production' ? '.gallerygrd.com' : undefined
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/mail', mailRouter);

app.get('/', (req, res, next) => {
  res.send('Gallery Grid server is functioning correctly!');
});

app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);
  res.status(500).send('Server error occurred! Please check the server console.');
});

app.listen(3065, () => {
  console.log('Running the express server.');
});
