const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productos");
const auth = require("../midlewares/auth");
const authadministrator = require("../midlewares/authadministrator");

router.get("/", async function (req, res, next) {
  const productos = await productosController.getProductos();
  res.json(productos);
});

router.get("/filter", async (req, res) => {
  const productos = await productosController.getProductosPorTipo(req.query.tipo);
  res.json(productos);
});

router.get("/menorPrecio", async (req, res) => {
  const productos = await productosController.getProductosPrecioAsc();
  res.json(productos);
});

router.get("/mayorPrecio", async (req, res) => {
  const productos = await productosController.getProductosPrecioDes();
  res.json(productos);
});

router.post("/", auth, authadministrator, async (req, res) => {
  const result = await productosController.addProducto(req.body);
  res.json(result);
});

router.put("/", auth, authadministrator, async (req, res) => {
  const result = await productosController.updateProducto(req.body);
  res.json(result);
});

router.delete("/:id", auth, authadministrator, async (req, res) => {
  const result = await productosController.deleteProducto(req.params.id);
  res.json(result);
});

router.post("/comprar", auth, async (req, res) => {
  const result = await productosController.comprarProductos(
    req.body.productos,
    req.body._id
  );
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const producto = await productosController.getProducto(req.params.id);
  res.json(producto);
});

module.exports = router;
