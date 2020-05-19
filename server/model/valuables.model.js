const mongoose = require('mongoose')

const Schema = mongoose.Schema

const valuablesSchema = new Schema({

    type: {
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
    item_description: {
        type: String,
        default: null
    },
    item_type: {
        type: String,
        enum: ["Electronics", "Wallets", "File/Doc", "Jewellery", "Kid", "Accessory", "others"],
        required: true
    }

})



module.exports.valuables = mongoose.model("valuables", valuablesSchema);