const productos = require("../data/productos");

async function getProductos() {
  return productos.getProductos();
}

async function getProducto(id) {
  return productos.getProducto(id);
}

async function addProducto(producto) {
  return productos.addProducto(producto);
}

async function updateProducto(producto) {
  return productos.updateProducto(producto);
}

async function deleteProducto(id) {
  return productos.deleteProducto(id);
}

async function comprarProductos(data) {
  return productos.comprarProductos(data);
}

module.exports = {
  getProductos,
  getProducto,
  addProducto,
  updateProducto,
  deleteProducto,
  comprarProductos
};
