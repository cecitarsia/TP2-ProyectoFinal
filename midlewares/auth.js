require("dotenv").config();
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const user = jwt.verify(token, process.env.CLAVEJWT);
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
}

module.exports = auth;
