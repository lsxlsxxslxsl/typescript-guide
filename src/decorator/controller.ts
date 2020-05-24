import router from '../router';

enum Method {
  get = 'get',
  post = 'post'
}
export function controller(target: any) {
  for (let key in target.prototype) {
    const path = Reflect.getMetadata('path', target.prototype, key);
    const method: Method = Reflect.getMetadata('method', target.prototype, key);
    const middleware = Reflect.getMetadata('middleware', target.prototype, key);
    const handler = target.prototype[key];
    path &&
      method &&
      handler &&
      (middleware ? router[method](path, middleware, handler) : router[method](path, handler));
  }
}
