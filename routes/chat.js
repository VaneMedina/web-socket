const path = require('path')
const { Router } = require('express');
const upload = require('../midlewares/file')
const Chat = require('../models/chat');

const router = new Router();

const chat = new Chat();

router.get('/', async(req, res)=>{
    try{
        const messages = await chat.getAll();
        res.render('index', { products });
    }catch(error){
        res.status(404).send({ error : error})
    }
})


const validacionId = async () =>{
    let id = 1;
    const messages = await chat.getAll().then(messages => {return messages});
    if(messages.length > 0){
        const index = messages.length -1;
        const message = messages[index];
        id = message.id + 1;
        return id;
    }
    return id;
}

router.post('/', upload.single("thumbnail"), async(req, res)=>{
    const thumbnail = path.join("/static/img/" + req.file.filename);
    const { title, price} = req.body;
    let id = await validacionId();
    await message.save({id, title, price, thumbnail});
    res.redirect("/");
})

module.exports = router 