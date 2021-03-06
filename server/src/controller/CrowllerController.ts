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

const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  const isLogin = !!(req.session ? req.session.login : false);
  isLogin ? next() : res.json(getResponseData('请先登录', null));
};

const test = (req: Request, res: Response, next: NextFunction): void => {
  console.log('test 中间件')
  next()
};

@controller('/api')
export class CrowllerController {
  @get('/getData')
  @use(checkLogin)
  getData(req: RequestWithBody, res: Response): void {
    const url = `https://coding.imooc.com/`;
    const analyzer = Analyzer.getInstance();
    new Crowller(url, analyzer);
    res.json(getResponseData<responseResult.getData>('爬取成功', true));
  }

  @get('/showData')
  @use(checkLogin)
  @use(test)
  showData(req: RequestWithBody, res: Response): void {
    try {
      const file = path.resolve(__dirname, '../../data/course.json');
      const data = fs.readFileSync(file, 'utf-8');
      res.json(getResponseData<responseResult.showData>('成功', JSON.parse(data)));
    } catch (error) {
      res.json(getResponseData<responseResult.showData>('文件不存在', false, false));
    }
  }
}
