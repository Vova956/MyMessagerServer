const {Schema, model } = require('mongoose');

//String Number Date Boolean ObjectId Array 

const ChatSchema = new Schema({
    nickname : {type: String,require : true},
    message : {type : String,require :true},
    id : {type : Number,require : true}  
})

module.exports = model('Messages',ChatSchema)