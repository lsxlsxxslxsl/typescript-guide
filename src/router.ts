import { Request, Response, Router } from 'express';
import Analyzer from './analyzer';
import Crowller from './crowller';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const url = `https://coding.imooc.com/`;
  const analyzer = Analyzer.getInstance();
  new Crowller(url, analyzer);
  res.send('get data successful');
});

export default router;
