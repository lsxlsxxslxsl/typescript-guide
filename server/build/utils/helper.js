"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = function (errMsg, data, success) {
    if (success === void 0) { success = true; }
    return {
        success: success,
        errMsg: errMsg,
        data: data
    };
};
