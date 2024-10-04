import { HttpException } from "./root";

export class UnprocessableEntity extends HttpException {
    constructor(message: string, errors: any, errorCode: number) {
        super(message, errorCode, 422, errors)
    }
}