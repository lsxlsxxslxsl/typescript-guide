import { Request, Response } from 'express';
import 'reflect-metadata';
import { controller, get, post } from '../decorator';
import { getResponseData } from '../utils/helper';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

@controller('/api')
export class LoginController {
  static isLogin(req: RequestWithBody): boolean {
    return !!(req.session ? req.session.login : false);
  }

  @get('/isLogin')
  isLogin(req: RequestWithBody, res: Response): void {
    const isLogin = LoginController.isLogin(req);
    res.json(getResponseData<boolean>('', isLogin));
  }

  @post('/login')
  login(req: RequestWithBody, res: Response): void {
    const { password } = req.body;
    const isLogin = LoginController.isLogin(req);
    if (isLogin) {
      res.json(getResponseData<boolean>('已经登录过', true));
    } else {
      if (password === '123' && req.session) {
        req.session.login = true;
        res.json(getResponseData<boolean>('登录成功', true));
      } else {
        res.json(getResponseData<boolean>('密码错误', false));
      }
    }
  }

  @get('/logout')
  logout(req: RequestWithBody, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData<boolean>('退出登录', true));
  }
}
