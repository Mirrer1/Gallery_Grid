import express from 'express';
import cors from 'cors';

import userRouter from './routes/user';
import postRouter from './routes/post';
import db from './models';

const app = express();
db.sequelize
  .sync()
  .then(() => console.log('Database Connection Successful'))
  .catch(console.error);

app.use(
  cors({
    origin: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('Running the Express server');
});
