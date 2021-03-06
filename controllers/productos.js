const productos = require("../data/productos");

async function getProductos() {
  return productos.getProductos();
}

async function getProducto(id) {
  return productos.getProducto(id);
}

async function getProductosPorTipo(type) {
  return productos.getProductosPorTipo(type);
}

async function getProductosPrecioAsc() {
  return productos.getProductosPrecioAsc();
}

async function getProductosPrecioDes() {
  return productos.getProductosPrecioDes();
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

async function comprarProductos(data, id) {
  return productos.comprarProductos(data, id);
}

module.exports = {
  getProductos,
  getProducto,
  getProductosPorTipo,
  getProductosPrecioAsc,
  getProductosPrecioDes,
  addProducto,
  updateProducto,
  deleteProducto,
  comprarProductos
};
