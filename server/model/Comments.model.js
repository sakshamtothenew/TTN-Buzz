const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentsSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: String,
        required: true
    },
    pushed_by: {
        type: Schema.Types.ObjectId,
        required: true
    },
    post_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    parent: {
        type: Schema.Types.ObjectId
    }

})

module.exports.Comments = mongoose.model("comments", CommentsSchema)