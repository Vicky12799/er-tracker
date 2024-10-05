"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpSchema = void 0;
const zod_1 = require("zod");
exports.SignUpSchema = zod_1.z.object({
    name: zod_1.z.string(),
    username: zod_1.z.string(),
    password: zod_1.z.string().min(6),
    phoneNumber: zod_1.z.string()
});
