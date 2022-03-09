const path = require('path')
const { Router } = require('express');
const upload = require('../midlewares/file')
const Product = require('../models/product');

const router = new Router();

const producto = new Product();

router.get('/', async(req, res)=>{
    try{
        const products = await producto.getAll();
        res.render('index', { products });
    }catch(error){
        res.status(404).send({ error : error})
    }
})


const validacionId = async () =>{
    let id = 1;
    const productos = await producto.getAll().then(products => {return products});
    if(productos.length > 0){
        const index = productos.length -1;
        const producto = productos[index];
        id = producto.id + 1;
        return id;
    }
    return id;
}

router.post('/', upload.single("thumbnail"), async(req, res)=>{
    const thumbnail = path.join("/static/img/" + req.file.filename);
    const { title, price} = req.body;
    let id = await validacionId();
    await producto.save({id, title, price, thumbnail});
    res.redirect("/");
})

module.exports = router 