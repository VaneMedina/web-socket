const knex = require('knex')
const fs = require('fs').promises;
const path = require('path');


class Message {
    constructor(){
        this.db = knex({
            client: "sqlite3",
            connection: {
                filename: "./messages.sqlite"
            },
            useNullAsDefault: true
        })
    }
    async getAll(){
        const messages = await this.db.select().from("messages")
        return messages
    }
    async getById(id){
        const movie = await this.db("messages").where({ id })
        return movie
    }
    async create(body){
        const result = await this.db("messages").insert(body)
        return result[0]
    }
    async loadData(){
        try{
            await this.db.schema.dropTableIfExists("messages")
            await this.db.schema.createTable("messages", table =>{
                table.increments("id")
                table.string("from")
                table.string("to")
                table.string("body")
            })

            const raw = await fs.readFile(path.join(__dirname, "../public/database/mensajes.json"))
            const messages = JSON.parse(raw)

            for(const message of messages) {
                console.log(message)
                await this.db("messages").insert(message)
            }

        }catch(e){
            console.log(e)
            throw e
        }
    }
}
module.exports = Message;