const users = require("../data/users");

async function getAllUsers() {
  return users.getAllUsers();
}

async function addUser(user) {
  return users.addUser(user);
}

async function addAdmintrator(user) {
  return users.addAdmintrator(user);
}

async function findByCredentials(email, password) {
  const user = await users.findByCredentials(email, password);
  const token = users.generateToken(user);
  return { user, token };
}

function generateToken(user) {
  return users.generateToken(user);
}

async function updateUser(id, user) {
  return users.updateUser(id, user);
}

async function deleteUser(id) {
  return users.deleteUser(id);
}

module.exports = { addUser, addAdmintrator, getAllUsers, findByCredentials, generateToken, updateUser, deleteUser };
