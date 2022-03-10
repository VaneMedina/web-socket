const knex = require('knex')
const fs = require('fs').promises;
const path = require('path')

class Product{
    constructor(){
        this.db = knex({
            client: "sqlite3",
            connection: {
                filename: "./products.sqlite"
            },
            useNullAsDefault: true
        })
    }
    async getAll(){
        const products = await this.db.select().from("products")
        return products
    }
    async save(product) {
        //Leo y almaceno los datos del archivo en una constante.
        try{
            const dataFile = await fs.readFile(this.nameFile);
            const data = JSON.parse(dataFile);
            data.push(product);
            await fs.writeFile(this.nameFile, JSON.stringify(data, null, 2), 'utf-8');
        }catch(error){
            console.log(error);
        }
    }
    async loadData(){
        try{
            await this.db.schema.dropTableIfExists("products")
            await this.db.schema.createTable("products", table =>{
                table.increments("id")
                table.string("title")
                table.integer("price")
                table.string("thumbnail")
            })

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