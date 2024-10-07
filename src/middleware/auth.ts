import { NextFunction, Request, Response } from "express";

import { ErrorCode } from "../exceptions/root";
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "../server";
import { User } from "@prisma/client";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { validTokens } from "../utils/valid-token";
import { secureHeapUsed } from "crypto";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // 1. extract token from header
    const token = req.headers.authorization
    // 2. if token not present throw unauthorized error
    if (!token) {
        return next(new UnauthorizedException('Need auth token', ErrorCode.UNAUTHORIZED))
    }

    try {
        // 3. if token verify toker and extract payload
        if (!validTokens.has(token!)) {
            return next(new UnauthorizedException('Token Expired', ErrorCode.EXPIRED_TOKEN))
        }
        const payload = jwt.verify(token!, JWT_SECRET) as any
        console.log('payload received')
        // 4. to get the user from the payload
        const user = await prismaClient.user.findFirst({ where: { id: payload.userId } }) as User
        console.log('user received', user)
        if (!user) {
            return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
        }
        const { password, ...userWithoutPassword } = user;
        req.user = userWithoutPassword
        next()
    }
    catch (error) {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }
}