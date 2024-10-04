import { Router } from "express";


const rootRouter: Router = Router()

rootRouter.get("/", (req, res) => {
    res.send('<h1> Hey Routing works</h1>')
})

export default rootRouter;
