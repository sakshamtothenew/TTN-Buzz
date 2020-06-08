const route = require("express").Router();
const {
  getAllActivities,
  getAllActivitiesByUserId,
  getActivityById,
  createActivities,
  updateActivitiesById,
  deleteActivities,
  deleteAll,
  updateActions,
  deleteAction
} = require("../controller/activity.controllers");

const verifyAuth = require('../middlewares/verifyAuthentication')

const { upload } = require("../Config/Multer.config");
route.get("/", verifyAuth, getAllActivities);

route.get("/user/:userid", getAllActivitiesByUserId);

route.get('/:id', getActivityById)

route.post("/", verifyAuth, upload.single("img"), createActivities);

route.put("/update/:id", updateActivitiesById);

route.delete('/actions/:user/:post', deleteAction)

route.put('/actions', updateActions)

route.delete("/:id", deleteActivities);

route.delete('/', deleteAll)

module.exports = route;
