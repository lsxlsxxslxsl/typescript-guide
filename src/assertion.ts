// 类型断言
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function getName(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true;
  }
  return false;
}

function swim(animal: Cat | Fish) {
  (animal as Fish).swim();
}

const tom1: Cat = {
  name: 'Tom',
  run() {
    console.log('run');
  }
};
swim(tom1);

class ApiError extends Error {
  code: number = 0;
}
class HttpError extends Error {
  statusCode: number = 200;
}

function isApiError(error: Error) {
  if (typeof (error as ApiError).code === 'number') {
    return true;
  }
  return false;
}
