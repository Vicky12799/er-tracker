"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntity = void 0;
const root_1 = require("./root");
class UnprocessableEntity extends root_1.HttpException {
    constructor(message, errors, errorCode) {
        super(message, errorCode, 422, errors);
    }
}
exports.UnprocessableEntity = UnprocessableEntity;
