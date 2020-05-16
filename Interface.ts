// 接口
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: string | number; // 任意属性(一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集)
}

let tom: Person = {
  id: 89757,
  name: 'Tom',
  age: 25,
  gender: 'male',
};
