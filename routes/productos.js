const express = require('express');
const router = express.Router();
const data = require('../data/productos.js');

router.get('/', async function(req, res, next) {
  const productos = await data.getProductos();
  res.json(productos);
});

router.get('/:id', async (req, res) => {
  const producto = await data.getProducto(req.params.id);
  res.json(producto);
});

router.post('/', async (req, res)=>{
    const result = await data.addProducto(req.body);
    res.json(result);
});

// TODO PUT: '/'
router.put('/', async (req, res)=>{
  const result = await data.updateProducto(req.body);
  res.json(result);
});

// TODO DELETE: '/:id'
router.delete('/:id', async (req, res)=>{
  const result = await data.deleteProducto(req.params.id);
  res.json(result);
});

module.exports = router;