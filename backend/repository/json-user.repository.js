import fs from "fs/promises"
import { USERS_DB_PATH } from "../constants/auth.constants.js";
import { generateId } from "../utils/general.js";

class JsonUserRepository{
    #usersChache = []
    #initalRead = true

    async #readData(){
        if(this.#initalRead){
            this.#usersChache =  JSON.parse(await fs.readFile(USERS_DB_PATH, "utf-8"))
            this.#initalRead = false
        }

        return this.#usersChache
    }

    async #writeData(data){
        console.log(data, typeof data)
        this.#usersChache = data
        await fs.writeFile(USERS_DB_PATH, 
            JSON.stringify(data, null, 4)
        )
    }

    async getAll(){
        let users = await this.#readData()
        return users
    }

    async getByUsername(username){
        let users = await this.#readData()
        return users.find(user => user.username === username)
    }

    async getByID(id){
        let users = await this.#readData()
        return users.find(user => user.id === id)
    }

    async create(username, password){
        let users = await this.#readData()
        let newUser = {
            id :  generateId(users),
            username : username,
            password : password
        }
        await this.#writeData([...users, newUser])
        return {
            id : newUser.id,
            username : newUser.username
        }
    }
}

export {
    JsonUserRepository
}