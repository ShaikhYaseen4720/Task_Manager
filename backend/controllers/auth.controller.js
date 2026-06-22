import {createUser} from "../services/auth.service.js"

const registerUser = async (req, res) => {
    let newUser = await createUser(req.body)

    return res.status(201).json({
        success : true,
        message : response.message,
        data : newUser
    })
}

export {
    registerUser
}