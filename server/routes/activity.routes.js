const route = require("express").Router();
const {
  getAllActivities,
  getAllActivitiesByUserId,
  createActivities,
  updateActivitiesById,
  deleteActivities,
  deleteAll,
  updateActions,
  deleteAction
} = require("../controller/activity.controllers");

const { upload } = require("../Config/Multer.config");
route.get("/", getAllActivities);

route.get("/:userid", getAllActivitiesByUserId);

route.post("/", upload.single("img"), createActivities);

route.put("/update/:id", updateActivitiesById);

route.delete('/actions/:user/:post', deleteAction)

route.put('/actions', updateActions)

route.delete("/:id", deleteActivities);

route.delete('/', deleteAll)

module.exports = route;
