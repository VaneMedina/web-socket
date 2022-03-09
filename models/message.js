const fs = require('fs').promises;
const path = require('path');


class Message {
    constructor() {
        this.nombreArchivo = path.join(__dirname, '../public/database/mensajes.json');
    }
    async save(message) {
        try{
            const dataFile = await fs.readFile(this.nombreArchivo);
            const messages = JSON.parse(dataFile);
            messages.push(message);
            await fs.writeFile(this.nombreArchivo, JSON.stringify(messages, null, 2), 'utf-8');
        }catch(error){
            console.log(error);
        }
    }
    async getAll(){
        const dataFile = await fs.readFile(this.nameFile);
        const messages = JSON.parse(dataFile);
        return messages;
    }
}
module.exports = Message;