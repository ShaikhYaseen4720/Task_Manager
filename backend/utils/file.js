import fs from "fs/promises"
import {USERS_DB_PATH} from "../constants/auth.constants.js"

const readJsonFile = async (path) => {
    return JSON.parse(await fs.readFile(path, "utf-8"))
}

const writeJsonFile = async (path, data) => {
        await fs.writeFile(path, JSON.stringify(data))
}


export {
    readJsonFile, writeJsonFile
}