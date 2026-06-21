import express from "express"
import {sessionConfig} from "./config/session.config.js"

const app = express()

app.use(express.json())
app.use(sessionConfig)


export {
    app
}