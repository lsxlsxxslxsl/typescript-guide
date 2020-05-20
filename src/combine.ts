interface Bird {
  fly: boolean;
  sing: () => void;
}

interface Dog {
  fly: boolean;
  bark: () => void;
}

// 类型断言
function trainAnimal(animal: Bird | Dog) {
  if (animal.fly) {
    (animal as Bird).sing();
  } else {
    (animal as Dog).bark();
  }
}

// in判断
function trainAnimal2(animal: Bird | Dog) {
  if ('sing' in animal) {
    animal.sing();
  } else {
    animal.bark();
  }
}

// typeof判断
function add(a: string | number, b: string | number) {
  if (typeof a === 'string' || typeof b === 'string') {
    return `${a}${b}`;
  }
  return a + b;
}

class NumberObj {
  count!: number;
}

// instanceof判断
function add2(a: object | NumberObj, b: object | NumberObj) {
  if (a instanceof NumberObj && b instanceof NumberObj) {
    return a.count + b.count;
  }
  return 0;
}
