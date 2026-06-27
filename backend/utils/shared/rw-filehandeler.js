import fs from "fs/promises"

class RWFilehandeler{
    #cache = []
    #initialRead = true

    constructor(filepath){
        this.filepath = filepath
    }

    async readData(){
        if(this.#initialRead){
            this.#cache =  JSON.parse(await fs.readFile(this.filepath, "utf-8"))
            this.#initialRead = false
        }
        return this.#cache
    }

    async writeData(data){
        if(!Array.isArray(data)){
            throw new TypeError(`Cannot write type of data ${typeof data}`)
        }
        
        this.#cache = data
        await fs.writeFile(this.filepath, 
            JSON.stringify(data, null, 4)
        )
    }

    async getCache(){
        return this.#cache.map(ele => ({...ele}))
    }

}

export {
    RWFilehandeler
}