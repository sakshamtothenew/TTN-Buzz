const route = require("express").Router();
const {
  getAllValuable,
  getValuableById,
  addValuables,
  updateValuablesById,
  deleteValuablesById,
} = require("../controller/valuable.controllers");

route.get("/", getAllValuable);

route.get("/:id", getValuableById);

route.post("/", addValuables);

route.put("/:id", updateValuablesById);

route.delete("/:id", deleteValuablesById);

module.exports = route;
