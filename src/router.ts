import { Request, Response, Router } from 'express';
import Analyzer from './analyzer';
import Crowller from './crowller';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(`
    <html>
      <body>
        <form method="post" action="/getData">
          <input type="password" name="password" />
          <button>提交</button>
        </form>
      </body>
    </html>
  `);
});

router.post('/getData', (req: Request, res: Response) => {
  if (req.body.password === '123') {
    const url = `https://coding.imooc.com/`;
    const analyzer = Analyzer.getInstance();
    new Crowller(url, analyzer);
    res.send('get data successful');
  } else {
    res.send('password Error!');
  }
});

export default router;
