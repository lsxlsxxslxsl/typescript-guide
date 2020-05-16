// 接口
interface Person {
  name: string;
  age?: number;
  [propName: string]: any; // 任意属性
}

let tom: Person = {
  name: 'Tom',
  gender: 'male'
};
