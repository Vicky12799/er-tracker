import { Router } from "express";
import authRouter from "./auth";
import expenseRouter from "./expense";


const rootRouter: Router = Router()

rootRouter.use('/auth', authRouter)
rootRouter.use('/expense', expenseRouter)

export default rootRouter;
