import express from "express"
import {registerUser} from "../controllers/auth.controller.js"
import {asyncHandeler} from "../middleware/asyncHandelers.js"

const router = express.Router()

router.post("/register", asyncHandeler(registerUser))

export default router