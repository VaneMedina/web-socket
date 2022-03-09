const path = require('path')
const { Router } = require('express');
const Chat = require('../models/message');

const router = new Router();

const chat = new Chat();

router.get('/', async(req, res)=>{
    try{
        const messages = await chat.getAll();
        res.status(200).send(messages)
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

router.post('/messages', async(req, res)=>{
    const { message, date, user } = req.body;
    console.log(req.body)
    let id = await validacionId();
    await chat.save({id, message, date, user});
    res.status(200)
})

module.exports = router 