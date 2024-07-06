import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from './routes/user';
import postRouter from './routes/post';
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

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!
    // cookie: {
    //   httpOnly: true,
    //   secure: false
    // }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/post', postRouter);

app.get('/', (req, res, next) => {
  res.send('Gallery Grid server is functioning correctly!');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send('Server error occurred! Please check the server console.');
});

app.listen(3065, () => {
  console.log('Running the express server.');
});
