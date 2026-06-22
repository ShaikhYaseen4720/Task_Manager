import bcrypt from "bcrypt"

const hashPassword = async (password) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

const verifyPassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch
}

const findUserByUsername = (username, users) => 
    users.find(user => user.username === username)


export {
    hashPassword, verifyPassword, findUserByUsername
}

