import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT
const SESSION_SECRET = process.env.SESSION_SECRET
console.log(SESSION_SECRET)

export {
    PORT,
    SESSION_SECRET
}