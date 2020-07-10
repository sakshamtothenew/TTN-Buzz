const route = require("express").Router();
const {
  getAllActivities,
  getAllActivitiesByUserId,
  getActivityById,
  createActivities,
  getComment,
  getCommentReplies,
  createComment,
  updateActivitiesById,
  deleteActivities,
  deleteAll,
  updateActions,
  deleteAction
} = require("../controller/activity.controllers");

const verifyAuth = require('../middlewares/verifyAuthentication')

const { checkActivityValidation } = require('../middlewares/inputValidations')

const { upload } = require("../Config/Multer.config");
route.get("/", verifyAuth, getAllActivities);

route.get("/user/:userid", getAllActivitiesByUserId);

route.get('/:id', getActivityById)

route.post("/", verifyAuth, upload.single("img"), checkActivityValidation, createActivities);

route.get('/comment/:postId', verifyAuth, getComment)

route.get('/comment/replies/:commentid', verifyAuth, getCommentReplies)

route.post('/comment/:postId', verifyAuth, createComment)

route.put("/update/:id", updateActivitiesById);

route.delete('/actions/:user/:post', deleteAction)

route.put('/actions', updateActions)

route.delete("/:id", verifyAuth , deleteActivities);

route.delete('/', deleteAll)

module.exports = route;
