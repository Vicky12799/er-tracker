import express, { Express } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes/root";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middleware/error";
import cors, { CorsOptions } from 'cors';

const app: Express = express()
const allowedOrigin = ['http://localhost:4200']
const corsOptions: CorsOptions = {
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add other methods if needed
    credentials: true // If you're handling cookies or authentication
};
// Enable CORS with options
app.use(cors(corsOptions));

app.use(express.json())

app.use('/api', rootRouter)

export const prismaClient = new PrismaClient(
    {
        log: ['query']
    }
)

app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.json({ message: "hello cors changes" })
})
app.listen(PORT, () => {
    console.log(`Application running successfully on ${PORT}`)
})

export default app