const route = require("express").Router();

const {
  getAllComplaints,
  getComplaintsById,
  getComplaintsByStatus,
  createComplaint,
  updateComplaintById,
  getComplaintsByUserId,
} = require("../controller/complaints.controllers");

const verifyAuth = require('../middlewares/verifyAuthentication')

const { checkComplaintValidation, checkUpdateComplaintValidation } = require('../middlewares/inputValidations')


const { upload } = require('../Config/Multer.config')

route.get("/:id", getComplaintsById);

route.get("/status/:status", getComplaintsByStatus);

route.post("/", verifyAuth, upload.single("img"), checkComplaintValidation, createComplaint);

route.get("/user/:id", verifyAuth, getComplaintsByUserId);

route.get("/", getAllComplaints);

route.put("/:id", checkUpdateComplaintValidation, updateComplaintById);

module.exports = route;
