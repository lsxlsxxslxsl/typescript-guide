// 类装饰器

function decorator() {
  return function <T extends new (...args: any[]) => {}>(constructor: T) {
    return class extends constructor {
      name: string = 'liusixin';
      getName() {
        console.log(this.name);
        return this.name;
      }
    };
  };
}

function decoratorFunc() {
  return function (constructor: any) {
    constructor.prototype.getName = () => {
      console.log('liusixin');
    };
  };
}

@decorator()
class Test {}
const test = new Test();

// 返回装饰器包装的类，有语法提示
const Test1 = decorator()(Test)
const test1 = new Test1();
test1.getName()
