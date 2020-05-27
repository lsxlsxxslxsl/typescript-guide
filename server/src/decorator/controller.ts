import { RequestHandler } from 'express';
import router from '../router';

enum Methods {
  get = 'get',
  post = 'post'
}

type Constructor = new (...args: any[]) => any;

export function controller(root: string) {
  return function (target: Constructor) {
    for (let key in target.prototype) {
      const path: string = Reflect.getMetadata('path', target.prototype, key);
      const method: Methods = Reflect.getMetadata('method', target.prototype, key);
      const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target.prototype, key);
      const handler = target.prototype[key];
      const fullPath = root === '/' ? path : `${root}${path}`
      path &&
        method &&
        (middlewares && middlewares.length ? router[method](fullPath, ...middlewares, handler) : router[method](fullPath, handler));
    }
  };
}
