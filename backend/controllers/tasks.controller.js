import {listTasks, listSingleTask, createTask, modifyTask, deleteTask} from "../services/tasks.service.js"

const getTasks = async (req, res) => {
    let tasks = await listTasks(req.session.userId)

    return res.json({
        success : true,
        message : "Tasks fetched successfully",
        data : tasks
    })
}

const getSingleTask = async (req, res) => {
    let task = await listSingleTask(req.params.id, req.session.userId)

    return res.json({
        success : true,
        message : "Task fetched successfully",
        data : task
    })
}

const addTask = async (req, res) => {
    let task = await createTask(req.session.userId, req.body)

    return res.status(201).json({
        success : true,
        message : "Task added successfully",
        data : task
    })
}

const updateTask = async (req, res) => {
    let task = await modifyTask(Number(req.params.id), req.session.userId, req.body)

    return res.json({
        success : true,
        message : "Task modified successfully",
        data : task
    })
}

const removeTask = async (req, res) => {
    let task = await deleteTask(Number(req.params.id), req.session.userId)

    return res.json({
        success : true,
        message : "task removed successfully",
        data : task
    })
}

export {
    getTasks, getSingleTask, addTask, updateTask, removeTask
}