const express = require("express");
const router = express.Router();
const historialController = require("../controllers/historial");

router.get("/:id", async function (req, res, next) {
  const historial = await historialController.getHistorial(req.params.id);
  res.json(historial);
});

module.exports = router;
