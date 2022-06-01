const connection = require("./conexion");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function getAllUsers() {
  const clientmongo = await connection.getConnection();
  const users = await clientmongo
    .db("Proyecto")
    .collection("Usuarios")
    .find()
    .toArray();
  return users;
}

async function addUser(user) {
  const clientmongo = await connection.getConnection();
  user.password = await bcrypt.hash(user.password, 8);

  const result = await clientmongo
    .db("Proyecto")
    .collection("Usuarios")
    .insertOne(user);
  return result;
}

async function findByCredentials(email, password) {
  const clientmongo = await connection.getConnection();
  const user = await clientmongo
    .db("Proyecto")
    .collection("Usuarios")
    .findOne({ email: email });

  if (!user) {
    throw new Error("Credenciales invalidas");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Credenciales invalidas");
  }

  return user;
}

function generateToken(user) {
  const token = jwt.sign({ _id: user._id }, process.env.CLAVEJWT, {
    expiresIn: "2h",
  });
  return token;
}

module.exports = { addUser, getAllUsers, findByCredentials, generateToken };
