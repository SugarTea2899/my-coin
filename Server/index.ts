import express from 'express';
import logger from 'morgan';
import myCoinRouter from './routes/myCoin';

const app = express();

app.use(logger('dev'));

app.use('/my-coin', myCoinRouter);

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'server alive'
  });
})  

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
