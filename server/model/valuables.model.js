const mongoose = require('mongoose')

const Schema = mongoose.Schema

const valuablesSchema = new Schema({

    category: {
        type: String,
        required: true,
        enum: ["Lost", "Found"]
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    description: {
        type: String,
        default: null
    },
    type: {
        type: String,
        enum: ["Electronics", "Wallets", "File/Doc", "Jewellery", "Kid", "Accessory", "others"],
        required: true
    },
    image: {
        type: Object,
    }
})

module.exports.valuables = mongoose.model("valuables", valuablesSchema);