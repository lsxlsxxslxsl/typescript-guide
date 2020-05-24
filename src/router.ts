import { NextFunction, Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';
import Analyzer from './utils/analyzer';
import Crowller from './utils/crowller';
import { getResponseData } from './utils/helper';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  isLogin ? next() : res.json(getResponseData('请先登录', null));
};

const router = Router();

router.get('/', () => {});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.json(getResponseData('已经登录过', null));
  } else {
    if (password === '123' && req.session) {
      req.session.login = true;
      res.redirect('/');
    } else {
      res.json(getResponseData('密码错误', null));
    }
  }
});

router.get('/logout', (req: RequestWithBody, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.redirect('/');
});

router.get('/getData', checkLogin, (req: RequestWithBody, res: Response) => {
  const url = `https://coding.imooc.com/`;
  const analyzer = Analyzer.getInstance();
  new Crowller(url, analyzer);
  res.json(getResponseData('爬取成功', null));
});

router.get('/showData', checkLogin, (req: RequestWithBody, res: Response) => {
  try {
    const file = path.resolve(__dirname, '../data/course.json');
    const data = fs.readFileSync(file, 'utf-8');
    res.json(getResponseData('成功', JSON.parse(data)));
  } catch (error) {
    res.json(getResponseData('文件不存在', null, false));
  }
});

export default router;
