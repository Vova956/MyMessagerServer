const {Schema, model } = require('mongoose');

//String Number Date Boolean ObjectId Array 

const UserSchema = new Schema({
    login : {type: String,require : true,unique : true},
    password : {type: String,require : true} ,
    nickname : {type: String,require : true,unique : true}  
})

module.exports = model('Users',UserSchema)