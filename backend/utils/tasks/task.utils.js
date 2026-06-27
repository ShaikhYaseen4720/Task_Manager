import { TasksRepository } from "../../repository/tasks.repository.js"

const taskRepo = new TasksRepository()

const checkTaskOr404 = async (id, userId) => {
    let task = await taskRepo.get(id, userId)
    if(!task){
        throw new Error("Task not found")
    }
    return task
}

export {
    checkTaskOr404
}