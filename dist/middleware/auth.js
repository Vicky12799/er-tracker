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
exports.authMiddleware = void 0;
const root_1 = require("../exceptions/root");
const jwt = __importStar(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const server_1 = require("..");
const unauthorized_1 = require("../exceptions/unauthorized");
const valid_token_1 = require("../utils/valid-token");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. extract token from header
    const token = req.headers.authorization;
    // 2. if token not present throw unauthorized error
    if (!token) {
        next(new unauthorized_1.UnauthorizedException('Unauthorized', root_1.ErrorCode.UNAUTHORIZED));
    }
    try {
        // 3. if token verify toker and extract payload
        if (!valid_token_1.validTokens.has(token)) {
            next(new unauthorized_1.UnauthorizedException('Token Expired', root_1.ErrorCode.EXPIRED_TOKEN));
        }
        const payload = jwt.verify(token, secrets_1.JWT_SECRET);
        console.log('payload received');
        // 4. to get the user from the payload
        const user = yield server_1.prismaClient.user.findFirst({ where: { id: payload.userId } });
        console.log('user received', user);
        if (!user) {
            next(new unauthorized_1.UnauthorizedException('Unauthorized', root_1.ErrorCode.UNAUTHORIZED));
        }
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        req.user = userWithoutPassword;
        next();
    }
    catch (error) {
        next(new unauthorized_1.UnauthorizedException('Unauthorized', root_1.ErrorCode.UNAUTHORIZED));
    }
});
exports.authMiddleware = authMiddleware;
