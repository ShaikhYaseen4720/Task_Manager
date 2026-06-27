import express from "express"
import {getTasks, getSingleTask, addTask, updateTask, removeTask} from "../controllers/tasks.controller.js"
import { asyncHandeler } from "../middleware/asyncHandelers.js"
import { userAuth } from "../middleware/sessionAuth.middleware.js"

const router = express.Router()

router.get("/", asyncHandeler(getTasks))
router.get("/:id", asyncHandeler(getSingleTask))
router.post("/", asyncHandeler(addTask))
router.patch("/:id", asyncHandeler(updateTask))
router.delete("/:id", asyncHandeler(removeTask))

export default router