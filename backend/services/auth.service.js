import {validateAuthData} from "../utils/shared/validations.js"
import {generateId} from "../utils/shared/general.js"
import {hashPassword, verifyPassword} from "../utils/auth/auth.utils.js"
import { ValidationError, ConflictError, NotFoundError } from "../errors/appError.js"
import { JsonUserRepository } from "../repository/user.repository.js"

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

const authenticateUser = async (userData) => {
    let validationResults = validateAuthData(userData)

    if(! validationResults.acceptable){
        throw new ValidationError(validationResults.message)
    }

    let user = await userRepo.getByUsername(userData.username)
    if(!user){
        throw new NotFoundError("User does not exits")
    }

    if(! await verifyPassword(userData.password, user.password)){
        throw new ValidationError("Invalid password")
    }

    return {...user}   
}

export {
    createUser, authenticateUser
}