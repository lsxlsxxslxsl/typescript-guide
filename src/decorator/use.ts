import { RequestHandler } from 'express';
import { CrowllerController, LoginController } from '../controller';

export function use(middleware: RequestHandler) {
  return function (target: LoginController | CrowllerController, key: string) {
    const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target, key) || []
    middlewares.push(middleware)
    Reflect.defineMetadata('middlewares', middlewares, target, key);
  };
}
