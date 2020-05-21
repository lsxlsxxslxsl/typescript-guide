import express from 'express';
import router from './router';

const app = express();
app.use(router)

app.listen(3000, () => {
  console.log('server is start at port 3000');
});
