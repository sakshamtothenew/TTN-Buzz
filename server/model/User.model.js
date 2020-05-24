const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["Admin", "Employee"],
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
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
