import {createUser} from "../services/auth.service.js"

const registerUser = async (req, res) => {
    let response = await createUser(req.body)
    return res.status(response.statusCode).json({
        message : response.message
    })
}

export {
    registerUser
}