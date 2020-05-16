const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    type: {
        type: String,
        required: true,
        enum: ["Admin", "Employee"]
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,

    },
    department: {
        type: String,

    },
    employee_id: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports.User = mongoose.model("Users", UserSchema)