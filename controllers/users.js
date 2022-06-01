const users = require("../data/users");

async function getAllUsers() {
  return users.getAllUsers();
}

async function addUser(user) {
  return users.addUser(user);
}

async function findByCredentials(email, password) {
  const user = await users.findByCredentials(email, password);
  const token = users.generateToken(user);
  return { user, token };
}

function generateToken(user) {
  return users.generateToken(user);
}

module.exports = { addUser, getAllUsers, findByCredentials, generateToken };
