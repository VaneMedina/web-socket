const path = require('path')
const { Router } = require('express');
const Chat = require('../models/message');

const router = new Router();

const chat = new Chat();

router.get("/", async (req, res) =>{
    await chat.loadData()
    const messages = await chat.getAll()
    res.send(messages)
})

router.get("/:id", async (req, res) =>{
    const message = await chat.getById(req.params.id)
    res.send(message);
       
})

router.post("/", async (req, res) =>{
    const { body } = req
    const id = await chat.create(body)
    res.status(201).send({ id })
})


module.exports = router 