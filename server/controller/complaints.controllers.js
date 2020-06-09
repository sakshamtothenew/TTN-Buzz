const {
  get_complaints_by_id,
  get_complaints_by_status,
  get_all_complaints,
  get_complaints_by_user,
  update_complaint_by_id,
  create_complaint,
} = require("../services/complaint.service");
const cloudinary = require('cloudinary')
const getComplaintsById = (req, res) => {
  get_complaints_by_id(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const getComplaintsByStatus = (req, res) => {
  get_complaints_by_status(req.params.status)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const createComplaint = async (req, res) => {
  
  if (req.file) {
    req.file = await cloudinary.v2.uploader.upload(req.file.path)
  }
  else {
    req.file = {filename  : null , secure_url : null}
  }
  
  create_complaint(req.body, req.file)
  .then((result) => {
    console.log(result)
    res.send(result);
  })
  .catch((err) => {
    res.status(400)
    res.send(err);
  });
};

const getAllComplaints = (req, res) => {
  get_all_complaints()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const updateComplaintById = (req, res) => {
  update_complaint_by_id(req.params.id, req.body)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const getComplaintsByUserId = (req, res) => {
  get_complaints_by_user(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

module.exports = {
  getAllComplaints,
  getComplaintsById,
  getComplaintsByStatus,
  createComplaint,
  updateComplaintById,
  getComplaintsByUserId,
};
