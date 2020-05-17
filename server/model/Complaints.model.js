const mongoose = require('mongoose')


const Schema = mongoose.Schema

const ComplaintSchema = new Schema({

    department: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true
    },
    issueId: {
        type: String,
        required: true
    },
    Assigned_to: {
        type: Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ["Resolved", "In-Progress", "Open"]
    }
})


module.exports.Complaints = mongoose.model("Complaints", ComplaintSchema)