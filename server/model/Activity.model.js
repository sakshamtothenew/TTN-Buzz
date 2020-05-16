const mongoose = require('mongoose')

const Schema = mongoose.Schema


const ActivitySchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()

    },
    title: {
        type: String,
        default: "no title available"
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,

    },
    lastUpdated: {
        type: Date,
        default: Date.now()
    }

})


module.exports.Activity = mongoose.model("Activities", ActivitySchema)
