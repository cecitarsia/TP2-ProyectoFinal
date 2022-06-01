var express = require("express");
var router = express.Router();
const usersController = require("../controllers/users");
const auth = require("./../midlewares/auth");

router.get("/", auth, async function (req, res, next) {
  const users = await usersController.getAllUsers();
  res.json(users);
});

router.post("/", async (req, res) => {
  const result = await usersController.addUser(req.body);
  res.json(result);
});

router.post("/login", async (req, res) => {
  try {
    const { user, token } = await usersController.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send({ user, token });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
