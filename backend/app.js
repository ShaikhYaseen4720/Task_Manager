import express from "express"
import cors from "cors"
import {sessionConfig} from "./config/session.config.js"
import { globalErrorHandler } from "./middleware/globalErrorHandling.middleware.js"
import authRouter from "./routes/auth.routes.js"
import taskRouter from "./routes/task.routes.js"
import { userAuth } from "./middleware/sessionAuth.middleware.js"

const app = express()

app.use(cors({
    origin : "http://localhost:5500",
    credentials : true
}))
app.use(express.json())
app.use(sessionConfig)

// auth routes
app.use("/auth", authRouter)

// task routes 
app.use("/tasks", userAuth, taskRouter )

// global error handeling
app.use(globalErrorHandler)

export {
    app
}