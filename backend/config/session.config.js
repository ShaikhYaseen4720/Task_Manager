import session from "express-session";
import {SESSION_SECRET} from "./config.js"

const sessionConfig = session({
    secret : SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 1000 * 60 * 30,
        httpOnly : true
    }
})

export {sessionConfig}