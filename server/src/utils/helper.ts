interface Result<T> {
  success: boolean;
  errMsg: string;
  data: T;
}

export const getResponseData = <T>(errMsg: string, data: T, success: boolean = true): Result<T> => {
  return {
    success,
    errMsg,
    data
  };
};
