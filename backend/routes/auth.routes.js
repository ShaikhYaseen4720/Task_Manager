import express from "express"
import {register, login, logout} from "../controllers/auth.controller.js"
import {asyncHandeler} from "../middleware/asyncHandelers.js"

const router = express.Router()

router.post("/register", asyncHandeler(register))
router.post("/login", asyncHandeler(login))
router.post("/logout", asyncHandeler(logout))


export default router