const path = require('path')
const { Router } = require('express');
const upload = require('../midlewares/file')
const Product = require('../models/product');

const router = new Router();

const producto = new Product();

router.get("/", async (req, res) =>{
    // await producto.loadData()
    const products = await producto.getAll()
    res.send(products)
})

router.get("/:id", async (req, res) =>{
    const product = await producto.getById(req.params.id)
    res.send(product); 
})

router.post("/", async (req, res) =>{
    const { body } = req
    console.log(body)
    const id = await producto.create(body)
    res.status(201).send({ id })
})

router.delete("/:id", async (req, res) =>{
    const { id } = req.params
    await producto.delete(id)
    res.sendStatus(200)
})


router.put("/:id", async (req, res) =>{
    const { id } = req.params
    const { body } = req
    await producto.update(id, body)
    res.sendStatus(200)
       
})


module.exports = router 