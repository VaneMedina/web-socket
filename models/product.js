const fs = require('fs').promises;
const path = require('path')

class Product{
    constructor(){
        this.nameFile = path.join(__dirname, '../public/database/products.json');
    }
    async getAll(){
        const dataFile = await fs.readFile(this.nameFile);
        const products = JSON.parse(dataFile);
        return products;
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
}

module.exports = Product