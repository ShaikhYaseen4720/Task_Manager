import path from "path"

const AUTH_FIELDS = ["username", "password"]

const AUTH_PROPERTY_CONFIGS = {
    username : {
        required : true,
        datatype : "string",
        minrange : 3,
        maxrange : 300
    },
    password : {
        required : true,
        datatype : "string",
        minrange : 8,
        maxrange : 64
    }
}

const USERS_DB_PATH = path.join(process.cwd(), "./db/users.json")

export {
    AUTH_FIELDS, 
    AUTH_PROPERTY_CONFIGS, 
    USERS_DB_PATH, 
}