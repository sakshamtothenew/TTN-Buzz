const mongoose = require('mongoose')


const ObjectId = id => mongoose.Types.ObjectId(id);
const ISOdate = date => new Date(date);


module.exports = {
    ObjectId,
    ISOdate
}