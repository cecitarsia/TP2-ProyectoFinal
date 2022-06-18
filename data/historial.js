const connection = require("./conexion");
const DATABASE = "Proyecto";
const COLLECTION_HISTORIAL = "Historial";
const objectId = require("mongodb").ObjectId;

// item = {
//     _id: id,
//     titulo: String,
//     cantidad: int,
//     precioUnitario,
// }

async function getHistorial(id) {
  const clientmongo = await connection.getConnection();
  const historial = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_HISTORIAL)
    .find({ userId: id })
    .toArray();
  return historial;
}

async function addCarrito(productos, userId) {
  const clientmongo = await connection.getConnection();
  const fecha = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");

  const carritoEnDb = {
    userId,
    productos,
    fecha,
  };
  const result = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_HISTORIAL)
    .insertOne(carritoEnDb);
  return result;
}

module.exports = {
  addCarrito,
  getHistorial,
};
