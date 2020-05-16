const mongoose = required('mongoose')

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
    note: {
        type: String
    },
    category: {
        type: String,
        enum: ["Electronics", "Wallets", "File/Doc", "Jewellery", "Kid", "Accessory", "others"],
        required: true
    }

})



module.exports.valuablesSchema = mongoose.model("valuables", valuablesSchema);