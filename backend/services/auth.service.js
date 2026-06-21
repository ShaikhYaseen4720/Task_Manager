import {validateAuthData} from "../utils/validations.js"
import {USERS_DB_PATH} from "../constants/auth.constants.js"

const createUser = async (user) => {
    let validationResults = validateAuthData(user)

    if (! validationResults.acceptable){
        validationResults.statusCode = 422
        return validationResults
    }

    validationResults.statusCode = 201
    validationResults.message = "Data validation sucessfull"
    return validationResults
}

export {
    createUser
}