import { Request, Response } from 'express';
import 'reflect-metadata';
import { controller, get, post } from '../decorator';
import { getResponseData } from '../utils/helper';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

@controller('/')
export class LoginController {
  static isLogin(req: RequestWithBody): boolean {
    return !!(req.session ? req.session.login : false);
  }

  @get('/api/isLogin')
  isLogin(req: RequestWithBody, res: Response): void {
    const isLogin = LoginController.isLogin(req);
    res.json(getResponseData('', isLogin));
  }

  @post('/login')
  login(req: RequestWithBody, res: Response): void {
    const { password } = req.body;
    const isLogin = LoginController.isLogin(req);
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
  logout(req: RequestWithBody, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
    }
    res.redirect('/');
  }

  @get('/')
  home(req: RequestWithBody, res: Response): void {
    const isLogin = LoginController.isLogin(req);
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
