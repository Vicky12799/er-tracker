import express, { Express } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes/root";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middleware/error";

const app: Express = express()

app.use(express.json())

app.use('/api', rootRouter)

export const prismaClient = new PrismaClient(
    {
        log: ['query']
    }
)

app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.json({ message: "hello" })
})
app.listen(PORT, () => {
    console.log(`Application running successfully on ${PORT}`)
})

export default app