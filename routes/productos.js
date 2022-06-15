const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productos");

router.get("/", async function (req, res, next) {
  const productos = await productosController.getProductos();
  res.json(productos);
});

router.get("/:id", async (req, res) => {
  const producto = await productosController.getProducto(req.params.id);
  res.json(producto);
});

router.post("/", async (req, res) => {
  const result = await productosController.addProducto(req.body);
  res.json(result);
});

router.put("/", async (req, res) => {
  const result = await productosController.updateProducto(req.body);
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const result = await productosController.deleteProducto(req.params.id);
  res.json(result);
});

router.post("/comprar", async (req, res) => {
  const result = await productosController.comprarProductos(
    req.body.productos,
    req.body._id
  );
  res.json(result);
});

module.exports = router;
