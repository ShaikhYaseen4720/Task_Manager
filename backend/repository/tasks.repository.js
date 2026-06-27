import {TASK_DB_PATH} from "../constants/tasks.constants.js"
import { RWFilehandeler } from "../utils/shared/rw-filehandeler.js"
import {generateId} from "../utils/shared/general.js"

class TasksRepository extends RWFilehandeler{
    constructor(){
        super(TASK_DB_PATH)
    }

    async getAll(userId){
        let tasks = await this.readData()
        tasks = tasks
                    .map(task => ({...task}))
                    .filter(task => task.userID === userId)
        return tasks
    }

    async get(taskId, userId){
        let tasks = await this.readData()
        let task =  tasks.find(task => task.id === taskId && task.userID === userId)
        return {...task}
    }

    async create(userID, data){
        let tasks = await this.readData()
        let newTask = {
            id : generateId(tasks),
            userID : userID,
            task : data.task,
            markAsCompleted : false,
            createdAt : new Date().toISOString()
        }

        tasks = [...tasks, newTask]
        await this.writeData(tasks)
        return {...newTask}
    }

    async update(id, userId, newData){
        let tasks = await this.readData()
        let taskIndex = tasks.findIndex(task => task.id === id && task.userID === userId)

        let updatedTask = {
            ...tasks[taskIndex],
            ...newData
        }

        tasks[taskIndex] = updatedTask
        let updatedTaskList = [...tasks]

        await this.writeData(updatedTaskList)
        return {...updatedTask}
    }   

    async delete(id, userId){
        let tasks = await this.readData()
        let updatedTaskList = tasks.filter(task => task.id !== id)

        let deletedTask = await this.get(id, userId)
        await this.writeData(updatedTaskList)

        return {...deletedTask}
    }
}

export {
    TasksRepository
}