const route = require("express").Router();
const {
  getAllValuable,
  getValuableById,
  addValuables,
  updateValuablesById,
  deleteValuablesById,
} = require("../controller/valuable.controllers");

const { checkValuableValidation } = require('../middlewares/inputValidations')

const verifyAuth = require('../middlewares/verifyAuthentication')

const { upload } = require('../Config/Multer.config')

route.get("/", verifyAuth, getAllValuable);

route.get("/:id", getValuableById);

route.post("/", verifyAuth, upload.single('img'), checkValuableValidation, addValuables);

route.put("/:id", updateValuablesById);

route.delete("/:id", deleteValuablesById);

module.exports = route;
