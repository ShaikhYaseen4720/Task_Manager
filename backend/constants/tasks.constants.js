import path from "path"

const TASK_FEILDS = ["task", "markAsCompleted"]
const TASK_REQUIRED_POST_FIELDS = ["task"]

const TASK_PROPERTY_CONFIGS = {
    task : {
        required : true,
        datatype : "string",
        minrange : 3,
        maxrange : 5000
    },
    markAsCompleted : {
        required : true,
        datatype : "boolean"
    }
    
}

const TASK_DB_PATH = path.join(process.cwd(), "db", "tasks.json")

export {
    TASK_FEILDS, TASK_PROPERTY_CONFIGS, TASK_DB_PATH, TASK_REQUIRED_POST_FIELDS
}