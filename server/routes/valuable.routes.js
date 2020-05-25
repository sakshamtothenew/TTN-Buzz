const route = require("express").Router();
const {
  getAllValuable,
  getValuableById,
  addValuables,
  updateValuablesById,
  deleteValuablesById,
} = require("../controller/valuable.controllers");

const {upload}  = require('../Config/Multer.config')

route.get("/", getAllValuable);

route.get("/:id", getValuableById);

route.post("/", upload.single('img') , addValuables);

route.put("/:id", updateValuablesById);

route.delete("/:id", deleteValuablesById);

module.exports = route;
