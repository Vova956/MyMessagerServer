const UserDTO = require("../DTO/userDTO");
const chatModel = require('../Models/chatModel');
var maxId = 0;

class ChatService{
    async findMaxId(){
        const candidates = await chatModel.find({});
        let Id = candidates[0].id;
    
        for(let i=1;i<candidates.length;i++){
            if(Id < candidates[i].id)
            Id = candidates[i].id;
        }

        if(!Id)
            return 0;

        return Id;
    }

    async postMessage(nickname,message){
        maxId = await this.findMaxId();

        if(!message){
            throw new Error("No message")
        }

        await chatModel.create({nickname : nickname,message : message,id : maxId+1})
        
        return {nickname : nickname,message : message,id : maxId+1};
    }
    
    async getMessages(amount){
        maxId = await this.findMaxId();

        if(amount < 0 || !amount){
            throw new Error("Invalid amount")
        }

        let messages = [];
        let amountOfMessages = 0;

        for(let i = (maxId-amount)<0?0:maxId-amount+1;i <= maxId;i++){
            messages[amountOfMessages] = await chatModel.findOne({id : i});
            amountOfMessages++;
        }

        return messages;
        
    }

    async getAllMessages(){
        const messages = chatModel.find({});
        return messages;
    }

    
}

module.exports = new ChatService();