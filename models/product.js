const knex = require('knex')
const fs = require('fs').promises;
const path = require('path')

class Product{
    constructor(){
        this.db = knex({
            client: "mysql",
            connection: {
                host: "localhost",
                port: 3306,
                user: "root",
                password: "",
                database: "products_db"
            }
        })
    }
    async getAll(){
        const products = await this.db.select().from("products")
        return products
    }
    async getById(id){
        const product = await this.db("products").where({ id })
        return product
    }
    async update(id, body){
        await this.db("products")
        .where({ id })
        .update(body)
    }
    async create(body){
        const result = await this.db("products").insert(body)
        return result[0]
    }
    async delete(id){
        await this.db("products")
        .where({ id })
        .del()
    }
    async loadData(){
        try{
            // await this.db.schema.dropTableIfExists("products")
            // await this.db.schema.createTable("products", table =>{
            //     table.increments("id")
            //     table.string("title")
            //     table.integer("price")
            //     table.string("thumbnail")
            // })

            const raw = await fs.readFile(path.join(__dirname, "../public/database/products.json"))
            const products = JSON.parse(raw)

            for(const product of products) {
                await this.db("products").insert(product)
            }

        }catch(e){
            console.log(e)
            throw e
        }
    }
}

module.exports = Product