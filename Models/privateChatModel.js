const {Schema, model } = require('mongoose');

//String Number Date Boolean ObjectId Array 

const privateChatSchema = new Schema({
    login : {type: String,require : true,unique : true},
    nickname : {type: String,require : true,unique : true},
    password : {type:String,require : true,default : "12345"},
    admin : {type : Boolean,default : false}  
})


module.exports = model('PrivateChatUsers',privateChatSchema)