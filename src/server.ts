import express, { Express } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes/root";

const app: Express = express()

app.use(express.json())

app.use('/api', rootRouter)

app.listen(PORT, () => {
    console.log('app working')
})