const route = require("express").Router();

const {
  getAllComplaints,
  getComplaintsById,
  getComplaintsByStatus,
  createComplaint,
  updateComplaintById,
  getComplaintsByUserId,
} = require("../controller/complaints.controllers");

const {upload} = require('../Config/Multer.config')

route.get("/:id", getComplaintsById);

route.get("/status/:status", getComplaintsByStatus);

route.post("/", upload.single("img"), createComplaint);

route.get("/user/:id", getComplaintsByUserId);

route.get("/", getAllComplaints);

route.put("/:id", updateComplaintById);

module.exports = route;
