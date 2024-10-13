import { Request, Response } from "express"
import { SignUpSchema } from "../schema/users"
import { prismaClient } from "../server";
import { compareSync, hashSync } from "bcrypt";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secrets";
import { nextTick } from "process";
import { NotFoundException } from "../exceptions/not-found";
import { validTokens } from "../utils/valid-token";



export const signup = async (req: Request, res: Response) => {
    SignUpSchema.parse(req.body)

    const { name, username, password: rawPassword, phoneNumber } = req.body;

    let user = await prismaClient.user.findFirst({
        where: {
            OR: [
                { username: username },
                { phoneNumber: phoneNumber }
            ]
        }
    })
    if (user) {
        if (user.username === username && user.phoneNumber === phoneNumber) {
            throw new BadRequestsException('Username and phone number already exists!', ErrorCode.USER_ALREADY_EXISTS)
        }
        else if (user.username === username) {
            throw new BadRequestsException('Username already exists!', ErrorCode.USER_ALREADY_EXISTS)
        }
        else if (user.phoneNumber === phoneNumber) {
            throw new BadRequestsException('Phone number already exists!', ErrorCode.USER_ALREADY_EXISTS)
        }
    }
    user = await prismaClient.user.create({
        data: {
            name,
            username,
            password: hashSync(rawPassword, 10),
            phoneNumber
        }
    })
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword)
}


export const login = async (req: Request, res: Response) => {
    const { identifier, password: rawPassword } = req.body

    const user = await prismaClient.user.findFirst({
        where: {
            OR: [
                { username: identifier },
                { phoneNumber: identifier }
            ]
        }
    });

    if (!user) {
        throw new NotFoundException('User not found!', ErrorCode.USER_NOT_FOUND);
    }

    if (!compareSync(rawPassword, user!.password)) {
        throw new BadRequestsException('Incorrect password!', ErrorCode.INCORRECT_PASSWORD);
    }

    const token = jwt.sign(
        {
            userId: user!.id,
            version: 1
        },
        JWT_SECRET
    );
    validTokens.add(token)

    const { password, ...userWithoutPassword } = user!;

    res.json({ user: userWithoutPassword, token })
}

export const logout = async (req: Request, res: Response) => {
    const token = req.headers.authorization

    if (!token) {
        throw new NotFoundException('Token not found!', ErrorCode.TOKEN_NOT_FOUND);
    }
    const result = validTokens.delete(token)
    console.log('log out status', result);
    res.end()
}

export const me = async (req: Request, res: Response) => {
    console.log('me');

    res.json(req.user)
}
