"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.logout = exports.login = exports.signup = void 0;
const users_1 = require("../schema/users");
const server_1 = require("..");
const bcrypt_1 = require("bcrypt");
const bad_requests_1 = require("../exceptions/bad-requests");
const root_1 = require("../exceptions/root");
const jwt = __importStar(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const not_found_1 = require("../exceptions/not-found");
const valid_token_1 = require("../utils/valid-token");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    users_1.SignUpSchema.parse(req.body);
    const { name, username, password: rawPassword, phoneNumber } = req.body;
    let user = yield server_1.prismaClient.user.findFirst({
        where: {
            OR: [
                { username: username },
                { phoneNumber: phoneNumber }
            ]
        }
    });
    if (user) {
        if (user.username === username && user.phoneNumber === phoneNumber) {
            throw new bad_requests_1.BadRequestsException('Username and phone number already exists!', root_1.ErrorCode.USER_ALREADY_EXISTS);
        }
        else if (user.username === username) {
            throw new bad_requests_1.BadRequestsException('Username already exists!', root_1.ErrorCode.USER_ALREADY_EXISTS);
        }
        else if (user.phoneNumber === phoneNumber) {
            throw new bad_requests_1.BadRequestsException('Phone number already exists!', root_1.ErrorCode.USER_ALREADY_EXISTS);
        }
    }
    user = yield server_1.prismaClient.user.create({
        data: {
            name,
            username,
            password: (0, bcrypt_1.hashSync)(rawPassword, 10),
            phoneNumber
        }
    });
    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
    res.json(userWithoutPassword);
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier, password: rawPassword } = req.body;
    const user = yield server_1.prismaClient.user.findFirst({
        where: {
            OR: [
                { username: identifier },
                { phoneNumber: identifier }
            ]
        }
    });
    if (!user) {
        throw new not_found_1.NotFoundException('User not found!', root_1.ErrorCode.USER_NOT_FOUND);
    }
    if (!(0, bcrypt_1.compareSync)(rawPassword, user.password)) {
        // throw new IncorrectPasswordException('Incorrect password!', ErrorCode.INCORRECT_PASSWORD);
    }
    const token = jwt.sign({
        userId: user.id,
        version: 1
    }, secrets_1.JWT_SECRET);
    valid_token_1.validTokens.add(token);
    const _a = user, { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
    res.json({ user: userWithoutPassword, token });
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        throw new not_found_1.NotFoundException('Token not found!', root_1.ErrorCode.TOKEN_NOT_FOUND);
    }
    const result = valid_token_1.validTokens.delete(token);
    console.log('log out status', result);
    res.end();
});
exports.logout = logout;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('me');
    res.json(req.user);
});
exports.me = me;
