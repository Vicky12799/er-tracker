import { Router } from "express";
import { login, logout, signup } from "../controllers/auth";
import { errorHandler } from "../error-handler";
import { authMiddleware } from "../middleware/auth";


const authRouter: Router = Router()

authRouter.post('/signup', errorHandler(signup))
authRouter.post('/login', errorHandler(login))
authRouter.post('/logout', [authMiddleware], errorHandler(logout))

export default authRouter;