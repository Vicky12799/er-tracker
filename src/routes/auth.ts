import { Router } from "express";
import { login, logout, me, signup } from "../controllers/auth";
import { errorHandler } from "../error-handler";
import { authMiddleware } from "../middleware/auth";


const authRouter: Router = Router()

authRouter.post('/signup', errorHandler(signup))
authRouter.post('/login', errorHandler(login))
authRouter.post('/logout', [authMiddleware], errorHandler(logout))
authRouter.get('/me', [authMiddleware], errorHandler(me))

export default authRouter;