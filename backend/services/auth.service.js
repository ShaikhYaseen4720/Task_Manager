import {validateAuthData} from "../utils/validations.js"
import {USERS_DB_PATH} from "../constants/auth.constants.js"
import {readJsonFile, writeJsonFile} from "../utils/file.js"
import {generateId} from "../utils/general.js"
import {hashPassword, findUserByUsername} from "../utils/auth.utils.js"
import { ValidationError, ConflictError } from "../errors/appError.js"

const createUser = async (userData) => {
    let validationResults = validateAuthData(userData)

    if (! validationResults.acceptable){
        throw new ValidationError(validationResults.message)
    }

    let users = await readJsonFile(USERS_DB_PATH)
    const user = findUserByUsername(userData.username, users)
    if(user){
        throw new ConflictError("Username already taken.")
    }

    let hashedPassword = await hashPassword(userData.password)
    let newUser = {
        id : generateId(users),
        username : userData.username,
        password : hashedPassword
    }

    await writeJsonFile(USERS_DB_PATH, [...users, newUser])

    return {id : newUser.id, username : newUser.username}
}

export {
    createUser
}