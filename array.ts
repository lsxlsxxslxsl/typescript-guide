// 数组
let fibonacci: number[] = [1, 1, 2, 3, 5];

let fibonacci1: Array<number> = [1, 1, 2, 3, 5]; // 数组泛型

// 接口描述数组
interface NumberArray {
  [index: number]: number;
}
let fibonacc2i: NumberArray = [1, 1, 2, 3, 5];

// 类数组
function sum() {
  let args: {
      [index: number]: number;
      length: number;
      callee: Function;
  } = arguments;
}
