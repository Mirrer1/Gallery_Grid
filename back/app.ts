import express from 'express';
import postRouter from './routes/post';
import db from './models';

const app = express();
db.sequelize
  .sync()
  .then(() => console.log('Database Connection Successful'))
  .catch(console.error);

app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('Running the Express server');
});
