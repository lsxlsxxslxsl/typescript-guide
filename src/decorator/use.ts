import { RequestHandler } from 'express';
import { CrowllerController, LoginController } from '../controller';

export function use(middleware: RequestHandler) {
  return function (target: LoginController | CrowllerController, key: string) {
    Reflect.defineMetadata('middleware', middleware, target, key);
  };
}
