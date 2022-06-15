const connection = require("./conexion");
const { addCarrito } = require("./historial");
const objectId = require("mongodb").ObjectId;
const DATABASE = "Proyecto";
const COLLECTION_PRODUCTS = "Productos";

async function getProductos() {
  const clientmongo = await connection.getConnection();
  const productos = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_PRODUCTS)
    .find()
    .toArray();
  return productos;
}

async function getProducto(id) {
  const clientmongo = await connection.getConnection();
  const producto = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_PRODUCTS)
    .find({ _id: new objectId(id) })
    .toArray();
  return producto;
}

async function addProducto(producto) {
  const clientmongo = await connection.getConnection();
  const result = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_PRODUCTS)
    .insertOne(producto);
  return result;
}

async function updateProducto(producto) {
  const clientmongo = await connection.getConnection();
  console.log(producto);
  const result = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_PRODUCTS)
    .updateOne(
      {
        _id: new objectId(producto._id),
      },
      {
        $set: {
          titulo: producto.titulo,
          descripcion: producto.descripcion,
          precio: producto.precio,
          imagen: producto.imagen,
          tipo: producto.tipo,
          stock: producto.stock,
        },
      }
    );
  return result;
}

async function deleteProducto(id) {
  const clientmongo = await connection.getConnection();
  const result = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_PRODUCTS)
    .deleteOne({ _id: new objectId(id) });
  return result;
}

async function comprarProductos(productos, userId) {
  //chequear stock, compara cant producto con stock actual
  const ids = productos.map((producto) => {
    return new objectId(producto._id);
  });
  const clientmongo = await connection.getConnection();
  const coleccionProductos = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_PRODUCTS);
  const result = await coleccionProductos
    .find({ _id: { $in: ids } }, { projection: { stock: 1 } })
    .toArray();
  console.log(result);
  const stockSuficiente = chequearStock(productos, result);
  if (stockSuficiente) {
    restarStock(productos, coleccionProductos);
    await addCarrito(productos, userId);
  }
  return stockSuficiente;
}

function chequearStock(prodReq, prodDb) {
  //if hay todos los productos en su cantidad-> suma al historial
  let stockSuficiente = true;
  let i = 0;
  while (stockSuficiente && i < prodReq.length) {
    let idProdReq = prodReq[i]._id;
    let indexProdDb = prodDb.findIndex((producto) => producto._id == idProdReq);
    if (prodReq[i].cantidad > prodDb[indexProdDb].stock) {
      stockSuficiente = false;
    }
    i++;
  }
  return stockSuficiente;
}

function restarStock(prodReq, coleccionProductos) {
  prodReq.forEach((element) => {
    coleccionProductos.updateOne(
      {
        _id: new objectId(element._id),
      },
      {
        $inc: { stock: -element.cantidad },
      }
    );
  });
}

module.exports = {
  getProductos,
  getProducto,
  addProducto,
  updateProducto,
  deleteProducto,
  comprarProductos,
};
