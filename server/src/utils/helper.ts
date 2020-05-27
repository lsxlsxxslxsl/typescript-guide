interface Result {
  success: boolean;
  errMsg: string;
  data: any;
}

export const getResponseData = (errMsg: string, data: any, success: boolean = true): Result => {
  return {
    success,
    errMsg,
    data
  };
};
