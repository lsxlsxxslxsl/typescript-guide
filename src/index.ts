import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import router from './router';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: 'session',
    keys: ['liusixin'],
    maxAge: 24 * 60 * 60 * 1000 // 24小时
  })
);

app.use(router);

app.listen(3000, () => {
  console.log('server is start at port 3000');
});
