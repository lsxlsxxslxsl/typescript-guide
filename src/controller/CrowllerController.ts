import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import 'reflect-metadata';
import { controller, get, use } from '../decorator';
import Analyzer from '../utils/analyzer';
import Crowller from '../utils/crowller';
import { getResponseData } from '../utils/helper';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  isLogin ? next() : res.json(getResponseData('请先登录', null));
};

@controller
class LoginController {
  @get('/getData')
  @use(checkLogin)
  getData(req: RequestWithBody, res: Response) {
    const url = `https://coding.imooc.com/`;
    const analyzer = Analyzer.getInstance();
    new Crowller(url, analyzer);
    res.json(getResponseData('爬取成功', null));
  }

  @get('/showData')
  @use(checkLogin)
  showData(req: RequestWithBody, res: Response) {
    try {
      const file = path.resolve(__dirname, '../../data/course.json');
      const data = fs.readFileSync(file, 'utf-8');
      res.json(getResponseData('成功', JSON.parse(data)));
    } catch (error) {
      res.json(getResponseData('文件不存在', null, false));
    }
  }
}
