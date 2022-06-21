const express = require("express");
const router = express.Router();
const historialController = require("../controllers/historial");
const auth = require("../midlewares/auth");

router.get("/:id", auth, async function (req, res, next) {
  const historial = await historialController.getHistorial(req.params.id);
  res.json(historial);
});

module.exports = router;
