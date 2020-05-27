const mongoose = require('mongoose')


const Schema = mongoose.Schema 

const actions = new Schema({

    value : {
        type : String, 
         required : true , 
         enum :["Like" , "Dislike"]
    },
    post_id : {
        type : Schema.Types.ObjectId,
        required : true
    } ,
    pushed_by : {
        type : Schema.Types.ObjectId ,
        required : true 
    } ,

    createdAt : {
        type : Date , 
        default : Date.now()
    } 

})


module.exports.action = mongoose.model("actions" ,actions);