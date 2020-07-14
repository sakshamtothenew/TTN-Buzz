const {
  get_complaints_by_id,
  get_complaints_by_status,
  get_all_complaints,
  get_complaints_by_user,
  update_complaint_by_id,
  create_complaint,
  get_Complaint_count
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
    req.file = { filename: null, secure_url: null }
  }
  create_complaint(req.body, req.file)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400)
      res.send(err);
    });
};

const getComplaintCount = (req, res) => {
  let userid = req.params.userid ? req.params.userid : null;
  const filterField = req.query.field;
  const filterValue = req.query.value;

  get_Complaint_count(userid, filterField, filterValue)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400)
      res.send(err)
    })
}

const getAllComplaints = (req, res) => {
  const filterField = req.query.field;
  const filterValue = req.query.value;
  const pageNo = req.params.pageNo
  get_all_complaints(pageNo, filterField, filterValue)
    .then((result) => res.send(result))
    .catch((err) => {
      res.status(400)
      res.send(err)
    });
};

const updateComplaintById = (req, res) => {
  update_complaint_by_id(req.params.id, req.body)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const getComplaintsByUserId = (req, res) => {
  const filterField = req.query.field;
  const filterValue = req.query.value;
  console.log(filterField, filterValue)
  const pageNo = req.params.pageNo
  get_complaints_by_user(req.params.id, pageNo, filterField, filterValue)
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
  getComplaintCount
};
