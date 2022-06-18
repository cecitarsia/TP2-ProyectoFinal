const connection = require("./conexion");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const DATABASE = "Proyecto";
const COLLECTION_USERS = "Usuarios";
const parseObjectId = require("../utils/parseObjectId");
require("dotenv").config();

async function getAllUsers() {
  const clientmongo = await connection.getConnection();
  const users = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_USERS)
    .find()
    .toArray();
  return users;
}

async function addUser(user) {
  const clientmongo = await connection.getConnection();
  user.activo = true;
  if (!user.rol) {
    //si un usuario no tiene rol le asignamos el de usuario comun, cuando agregamos el admin con este metodo ya tiene su rol de admin
    user.rol = "usuario";
  }

  user.password = await bcrypt.hash(user.password, 8);

  const result = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_USERS)
    .insertOne(user);
  return result;
}

async function addAdmintrator(user) {
  user.rol = "administrador";
  return addUser(user);
}

async function findByCredentials(email, password) {
  const clientmongo = await connection.getConnection();
  const user = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_USERS)
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
  const token = jwt.sign(
    { _id: user._id, rol: user.rol },
    process.env.CLAVEJWT,
    {
      //agregamos el rol en el token para que en auth se pueda asignar
      expiresIn: "2h",
    }
  );
  return token;
}

//Solo para actualizar el mail
async function updateUser(id, user) {
  const clientmongo = await connection.getConnection();

  const obId = parseObjectId(id);
  const result = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_USERS)
    .updateOne({ _id: obId }, { $set: { email: user.email } });
  return result;
}

async function deleteUser(id) {
  const clientmongo = await connection.getConnection();
  const obId = parseObjectId(id);
  const result = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_USERS)
    .updateOne({ _id: obId }, { $set: { activo: false } });
  return result;
}

module.exports = {
  addUser,
  addAdmintrator,
  getAllUsers,
  findByCredentials,
  generateToken,
  updateUser,
  deleteUser,
};
