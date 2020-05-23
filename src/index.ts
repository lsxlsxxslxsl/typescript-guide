import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import router from './router';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req: Request, res: Response, next: NextFunction) => {
  req.username = 'liusixin'
  next()
});
app.use(router);

app.listen(3000, () => {
  console.log('server is start at port 3000');
});
