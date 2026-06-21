import {USERS_DB_PATH} from "../constants/auth.constants"

const readUserFromDB = async () => {
    try {
        return JSON.parse(await fs.readFile(USERS_DB_PATH, "utf-8"))
    } catch (error) {
        console.log(error)
    }
}

const writeUserInDB = async (data) => {
    try {
        await fs.writeFile(USERS_DB_PATH, JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
}