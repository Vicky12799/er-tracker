import { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorized";


export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if (user?.role === "ADMIN") {
        next()
    } else {
        next(new UnauthorizedException('Need admin privilege', ErrorCode.UNAUTHORIZED))
    }


}