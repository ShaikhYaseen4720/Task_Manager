import express from "express"
import {sessionConfig} from "./config/session.config.js"
import { globalErrorHandler } from "./middleware/global_errorhandleing.middleware.js"
import authRouter from "./routes/auth.route.js"

const app = express()

app.use(express.json())
app.use(sessionConfig)

// auth routes
app.use("/auth", authRouter)

// task routes 

// global error handeling
app.use(globalErrorHandler)

export {
    app
}