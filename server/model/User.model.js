const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  type: {
    type: String,

    enum: ["Admin", "Employee"],
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  department: {
    type: String
  },
  token: {
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
  picture: {
    type: String
  },
  maritalStatus: {
    type: String,
    enum: ["Married", "Single", "Seperated", "Divorced", "Widowed"]
  },
  nationality: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
  },
  personalEmail: {
    type: String,
  },
  newerId: {
    type: Number
  },
  dob: {
    type: Date,
  },
  birthCountry: {
    type: String
  },
  birthPlace: {
    type: String
  },
  mobileNumber: {
    type: String,
  }

});

UserSchema.pre("updateOne", () => {
  this.set({ updatedAt: Date.now() });
});

module.exports.User = mongoose.model("Users", UserSchema);
