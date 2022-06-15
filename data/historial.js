const connection = require("./conexion");
const objectId = require("mongodb").ObjectId;
const DATABASE = "Proyecto";
const COLLECTION_HISTORIAL = "Historial";

// item = {
//     _id: id,
//     titulo: String,
//     cantidad: int,
//     precioUnitario,
// }

async function addCarrito(productos, userId) {
  const clientmongo = await connection.getConnection();
  const carritoEnDb = {
    userId,
    productos,
  };
  const result = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_HISTORIAL)
    .insertOne(carritoEnDb);
  return result;
}

module.exports = {
  addCarrito,
};
