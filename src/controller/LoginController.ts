import { Request, Response } from 'express';
import 'reflect-metadata';
import { getResponseData } from '../utils/helper';
import { controller, get, post } from './decorator';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

@controller
class LoginController {
  @post('/login')
  login(req: RequestWithBody, res: Response) {
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
  }

  @get('/logout')
  logout(req: RequestWithBody, res: Response) {
    if (req.session) {
      req.session.login = undefined;
    }
    res.redirect('/');
  }

  @get('/')
  home(req: RequestWithBody, res: Response) {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
      res.send(`
      <html>
        <body>
          <a href='/getData'>爬取内容</a>
          <a href='/showData'>展示内容</a>
          <a href='/logout'>退出</a>
        </body>
      </html>
    `);
    } else {
      res.send(`
      <html>
        <body>
          <form method="post" action="/login">
            <input type="password" name="password" />
            <button>登陆</button>
          </form>
        </body>
      </html>
    `);
    }
  }
}
