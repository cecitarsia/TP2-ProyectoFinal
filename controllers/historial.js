const historial = require("../data/historial");

async function getHistorial(id) {
  return historial.getHistorial(id);
}

module.exports = {getHistorial};