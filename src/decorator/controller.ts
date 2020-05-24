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
      const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key);
      const handler = target.prototype[key];
      const fullPath = root === '/' ? path : `${root}${path}`
      path &&
        method &&
        (middleware ? router[method](fullPath, middleware, handler) : router[method](fullPath, handler));
    }
  };
}
