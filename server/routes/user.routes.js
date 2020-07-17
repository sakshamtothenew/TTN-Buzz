const route = require("express").Router();
const {
  addUser,
  getUserById,
  getAllUsers,
  updateUserById,
  getUserByDepartmentAndName,
  updateUserProfileData
} = require("../controller/user.controllers");
const verifyAuth = require("../middlewares/verifyAuthentication");
route.post("/", addUser);

route.get('/assigned/all', verifyAuth, getUserByDepartmentAndName)

route.get("/:id", getUserById);

route.get("/", getAllUsers);

route.put('/profile/:id', updateUserProfileData)

route.put("/:id", verifyAuth, updateUserById);


module.exports = route;
