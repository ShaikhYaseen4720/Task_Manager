import fs from "fs/promises"
import { USERS_DB_PATH } from "../constants/auth.constants.js";
import { generateId } from "../utils/shared/general.js";
import {RWFilehandeler} from "../utils/shared/rw-filehandeler.js"

class JsonUserRepository extends RWFilehandeler{
    constructor(){
        super(USERS_DB_PATH)
    }

    async getAll(){
        let users = await this.readData()
        return users.map(user => ({...user}))
    }

    async getByUsername(username){
        let users = await this.readData()
        let user = users.find(user => user.username === username)
        return user ? {...user} : undefined
    }
    
    async getByID(id){
        let users = await this.readData()
        let user =  users.find(user => user.id === id)
        return user ? {...user} : undefined
    }

    async create(username, password){
        let users = await this.readData()
        let newUser = {
            id :  generateId(users),
            username : username,
            password : password
        }
        await this.writeData([...users, newUser])
        return {
            id : newUser.id,
            username : newUser.username
        }
    }
}

export {
    JsonUserRepository
}