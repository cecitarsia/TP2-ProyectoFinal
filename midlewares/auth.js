require("dotenv").config();
const jwt = require("jsonwebtoken");

function auth(req, res, next) {

  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodertoken = jwt.verify(token, process.env.CLAVEJWT);
    req.params.userid = decodertoken._id;
    req.params.userrol = decodertoken.rol;
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
}

module.exports = auth;
