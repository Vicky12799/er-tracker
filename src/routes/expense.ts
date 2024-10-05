
import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { errorHandler } from "../error-handler";


const expenseRouter: Router = Router()
expenseRouter.get('/get', [authMiddleware], errorHandler((req: Request, res: Response) => {
    res.json({ data: "no expenses" })
}))

export default expenseRouter;