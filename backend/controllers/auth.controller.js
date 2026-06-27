import {createUser, authenticateUser} from "../services/auth.service.js"

const register = async (req, res) => {
    let newUser = await createUser(req.body)

    return res.status(201).json({
        success : true,
        message : "User created successfully",
        data : newUser
    })
}

const login = async (req, res) => {
    let user = await authenticateUser(req.body)

    req.session.userId = user.id 
    req.session.username = user.username

    return res.json({
        success : true,
        message : "User logged in successul"
    })
}

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err){
            return res.status(500).json({
                success : false,
                message : "Unable to logout"
            })
        }

        res.clearCookie("connect.sid")

        return res.json({
            success : "true",
            message : "User logged out successful"
        })
    })
}

export {
    register, login, logout
}