import {validateAuthData} from "../utils/validations.js"
import {generateId} from "../utils/general.js"
import {hashPassword, findUserByUsername} from "../utils/auth.utils.js"
import { ValidationError, ConflictError } from "../errors/appError.js"
import { JsonUserRepository } from "../repository/json-user.repository.js"

const userRepo = new JsonUserRepository()

const createUser = async (userData) => {
    let validationResults = validateAuthData(userData)

    if (! validationResults.acceptable){
        throw new ValidationError(validationResults.message)
    }

    let user = await userRepo.getByUsername(userData.username)
    if(user){
        throw new ConflictError("Username already taken.")
    }

    let hashedPassword = await hashPassword(userData.password)
    let newUser = await userRepo.create(userData.username, hashedPassword)

    return newUser
}

export {
    createUser
}