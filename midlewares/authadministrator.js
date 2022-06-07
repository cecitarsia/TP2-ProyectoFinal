const jwt = require("jsonwebtoken");

async function authadministrator(req, res, next) {
  try {
    if (req.params.userrol != "administrador") {
      return res.status(403).json({ error: "No posee autorización" }); //si no es admin tiene q cortarse la ejecucion por eso el return
    }
    next(); 
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
}

module.exports = authadministrator;