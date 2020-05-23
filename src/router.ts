import { Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';
import Analyzer from './analyzer';
import Crowller from './crowller';

interface RequestWithBody extends Request {
  body: {
    [propName: string]: string | undefined;
  };
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send(`
      <html>
        <body>
          <a href="/showData">展示数据</a>
          <a href="/getData">爬取数据</a>
          <a href="/logout">退出登录</a>
        </body>
      </html>
    `);
  } else {
    res.send(`
      <html>
        <body>
          <form method="post" action="/login">
            <input type="password" name="password" />
            <button>登录</button>
          </form>
        </body>
      </html>
    `);
  }
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send('已经登陆过');
  } else {
    if (password === '123' && req.session) {
      req.session.login = true;
      res.redirect('/');
    } else {
      res.send('登陆失败');
    }
  }
});

router.get('/logout', (req: RequestWithBody, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.redirect('/');
});

router.get('/getData', (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    const url = `https://coding.imooc.com/`;
    const analyzer = Analyzer.getInstance();
    new Crowller(url, analyzer);
    res.send('get data successful');
  } else {
    res.send('请登录后尝试');
    // setTimeout(function () {
    //   res.redirect('/');
    // }, 1500);
  }
});

router.get('/showData', (req: RequestWithBody, res: Response) => {
  try {
    const file = path.resolve(__dirname, '../data/course.json');
    const data = fs.readFileSync(file, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.send('文件不存在');
  }
});

export default router;
