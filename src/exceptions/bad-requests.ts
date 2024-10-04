import { HttpException } from "./root";

export class BadRequestsException extends HttpException {
    constructor(message: string, errorCode: number) {
        super(message, errorCode, 400, null)
    }
}