var express = require("express");
var router = express.Router();
const usersController = require("../controllers/users");
const auth = require("./../midlewares/auth");
const authadministrator = require("./../midlewares/authadministrator");

//solo los admin pueden obtener el listado completo de usuarios
router.get("/", auth, authadministrator, async function (req, res, next) {
  try {
    res.json(await usersController.getAllUsers());
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const new_User = req.body;
    if(!new_User.email || !new_User.password) {
    res.status(400).json({error: "datos inválidos"});
    return;
    }
    const result = await usersController.addUser(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  } 
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

router.post("/admin", auth, async (req, res) => {
  const new_User = req.body;
  if (!new_User.email || !new_User.password) {
    res.status(400).json({error: "datos inválidos"});
    return;
  }
  const result = await usersController.addAdmintrator(new_User);
  res.send(result);
});

router.put("/:id", auth, async (req, res) => {
  try {
    const result = await usersController.updateUser(req.params.id, req.body);
    result.matchedCount ? res.send(result) : res.status(404).json({error: "id no encontrado"});
  } catch (error) {
    res.status(500).json({error: error.message});  
  }
});

//este delete esta choto sin control de errores ni auth para poder usarlo rapido nomas. con auth admin no funciona.
//hacer try catch y validar el token
//if (req.params.userrol == "usuario" && req.params.userid != req.params.id)
router.delete("/:id", async (req, res) => {
  const result = await usersController.deleteUser(req.params.id);
  res.json(result);
});

module.exports = router;
