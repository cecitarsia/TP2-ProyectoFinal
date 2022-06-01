const connection = require("./conexion");
const objectId = require("mongodb").ObjectId;

async function getProductos() {
  const clientmongo = await connection.getConnection();
  const productos = await clientmongo
    .db("Proyecto")
    .collection("Productos")
    .find()
    .toArray();
  return productos;
}

async function getProducto(id) {
  const clientmongo = await connection.getConnection();
  const producto = await clientmongo
    .db("Proyecto")
    .collection("Productos")
    .find({ _id: new objectId(id) })
    .toArray();
  return producto;
}

async function addProducto(producto) {
  const clientmongo = await connection.getConnection();
  const result = await clientmongo
    .db("Proyecto")
    .collection("Productos")
    .insertOne(producto);
  return result;
}

async function updateProducto(producto) {
  const clientmongo = await connection.getConnection();
  console.log(producto);
  const result = await clientmongo
    .db("Proyecto")
    .collection("Productos")
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
    .db("Proyecto")
    .collection("Productos")
    .deleteOne({ _id: new objectId(id) });
  return result;
}

module.exports = {
  getProductos,
  getProducto,
  addProducto,
  updateProducto,
  deleteProducto,
};
