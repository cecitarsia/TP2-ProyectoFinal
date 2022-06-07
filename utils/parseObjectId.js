const ObjectId = require("mongodb").ObjectId;

//Esto le aplica un try catch la creación de un ObjectId para poder filtrar todo lo que no respete el formato
//evita la excepcion y en caso de que falle devuelve null 
function parseObjectId(id) {
  try {
    return new ObjectId(id);
  } catch {
    return;
  }
}

module.exports = parseObjectId;