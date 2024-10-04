// message , status code , error codes, error

export class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: any;

    constructor(message: string, errorCode: ErrorCode, statusCode: number, error: any) {
        super(message)
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error

    }
}

export enum ErrorCode {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    UNAUTHORIZED = 1004,
    TOKEN_NOT_FOUND = 1005,
    EXPIRED_TOKEN = 1006,

    UNPROCESSABLE_ENTITY = 4001,

    INTERNAL_EXCEPTION = 5001,

}