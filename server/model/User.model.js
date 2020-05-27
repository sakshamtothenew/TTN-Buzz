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
  token : {
    type : String,
    required : true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre("updateOne", () => {
  this.set({ updatedAt: Date.now() });
});

module.exports.User = mongoose.model("Users", UserSchema);
