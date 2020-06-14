const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
  department: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Object,
    required: true,
  },
  issueId: {
    type: String,
    required: true,
  },
  issueTitle: {
    type: String,
    required: true
  },
  Assigned_to: {
    type: "String"
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  estimated_time: {
    type: Date,

  },
  status: {
    type: String,
    enum: ["Resolved", "In-Progress", "Open"],
  },
  image: {
    type: Object
  }
});

module.exports.Complaints = mongoose.model("Complaints", ComplaintSchema);
