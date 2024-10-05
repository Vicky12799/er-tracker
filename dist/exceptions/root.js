"use strict";
// message , status code , error codes, error
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, errorCode, statusCode, error) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error;
    }
}
exports.HttpException = HttpException;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    ErrorCode[ErrorCode["USER_ALREADY_EXISTS"] = 1002] = "USER_ALREADY_EXISTS";
    ErrorCode[ErrorCode["INCORRECT_PASSWORD"] = 1003] = "INCORRECT_PASSWORD";
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 1004] = "UNAUTHORIZED";
    ErrorCode[ErrorCode["TOKEN_NOT_FOUND"] = 1005] = "TOKEN_NOT_FOUND";
    ErrorCode[ErrorCode["EXPIRED_TOKEN"] = 1006] = "EXPIRED_TOKEN";
    ErrorCode[ErrorCode["UNPROCESSABLE_ENTITY"] = 4001] = "UNPROCESSABLE_ENTITY";
    ErrorCode[ErrorCode["INTERNAL_EXCEPTION"] = 5001] = "INTERNAL_EXCEPTION";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
