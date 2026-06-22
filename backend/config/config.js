import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT
const SESSION_SECRET = process.env.SESSION_SECRET
const NODE_ENV = process.env.NODE_ENV

export {
    PORT,
    SESSION_SECRET,
    NODE_ENV
}