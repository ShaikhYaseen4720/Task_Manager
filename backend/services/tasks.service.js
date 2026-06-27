import { TasksRepository } from "../repository/tasks.repository.js"
import { checkTaskOr404 } from "../utils/tasks/task.utils.js"
import {validateTaskData} from "../utils/shared/validations.js"
import { NotFoundError, ValidationError } from "../errors/appError.js"

let taskRepo = new TasksRepository()

const listTasks = async(userId) => {
    let tasks = await taskRepo.getAll(userId)
    return [...tasks]
}

const listSingleTask = async(id, userId) => {
    let task = await checkTaskOr404(id, userId)
    return {...task}
}

const createTask = async(userId, data) => {
    let validationResults = validateTaskData(data)

    if(!validationResults.acceptable){
        throw new ValidationError(validationResults.message)
    }

    let task = await taskRepo.create(userId, data)
    return {...task}
}

const modifyTask = async(id, userId, newData) => {
    await checkTaskOr404(id, userId)

    let validationResults = validateTaskData(newData, false)
    if(!validationResults.acceptable){
        throw new ValidationError(validationResults.message)
    }

    let modifiedTask = await taskRepo.update(id, userId, newData)
    return {...modifiedTask}
}

const deleteTask = async(id, userId) => {
    await checkTaskOr404(id, userId)
    let task = await taskRepo.delete(id, userId)
    return  task
}


export {
    listTasks, listSingleTask, createTask, modifyTask, deleteTask
}

