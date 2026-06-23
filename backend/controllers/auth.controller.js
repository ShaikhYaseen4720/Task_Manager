import {createUser} from "../services/auth.service.js"

const registerUser = async (req, res) => {
    let newUser = await createUser(req.body)

    return res.status(201).json({
        success : true,
        message : "User created successfully",
        data : newUser
    })
}

export {
    registerUser
}