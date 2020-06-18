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
    content: {
        type: String,
        required: true
    },
    image: {
        type: Object,
    },
    lastUpdated: {
        type: Date,
        default: Date.now()
    }
})

ActivitySchema.pre('updateOne', function (next) {
    this.set({ lastUpdated: Date.now() })
})

module.exports.Activity = mongoose.model("Activities", ActivitySchema)
