const UserDTO = require("../DTO/userDTO");
const privateChat = require('../Models/chatModel');
const privateChatUsers = require('../Models/privateChatModel');
const tokenService = require('../Service/tokenService');
var maxId = 0;

class GroupService{

    async findMaxId(){
        const candidates = await privateChat.find({});
        let Id = candidates[0].id;
    
        for(let i=1;i<candidates.length;i++){
            if(Id < candidates[i].id)
            Id = candidates[i].id;
        }

        if(!Id)
            return 0;

        return Id;
    }

    async getUsers(UserLogin){
        const user = await privateChatUsers.find({login : UserLogin});

        if(!user){
            throw new Error("Current user is not admin")
        }

        const candidates = await privateChatUsers.find({});
        return candidates
    }

   async postMessage(nickname,message){
        maxId = await this.findMaxId();

        if(!message){
            throw new Error("No message")
        }

        const user = await privateChatUsers.findOne({nickname : nickname});
        if(!user){
            throw new Error("No such user")
        }

        maxId++;

        privateChat.create({nickname : nickname,message : message,id : maxId})
        
        return {nickname : nickname,message : message,id : maxId-1};
    }

    async addAdmin(login ,nickname,password){
        const nickCandidate = await privateChatUsers.findOne({nickname : nickname});
        const loginCandidate = await privateChatUsers.findOne({login : login});

        if(nickCandidate || loginCandidate){
            throw new Error("Current user exists!")
        }


        privateChatUsers.create({nickname : nickname,login : login,password : password,admin : true})
        return {nickname : nickname,login : login,password : password,admin : true}
    }

    async addUser(adminPassword,login,nickname,password){
        const user = await privateChatUsers.find({password : adminPassword});

        if(!user){
            throw new Error("Current user is not admin")
        }

        const nickCandidate = await privateChatUsers.findOne({nickname : nickname});
        const loginCandidate = await privateChatUsers.findOne({login : login});

        if(nickCandidate || loginCandidate){
            throw new Error("Current user exists!")
        }

        privateChatUsers.create({nickname : nickname,login : login,password : password,admin : false})
        return {nickname : nickname,login : login,password : password,admin : false}

    }

    async getMessages(amount){
        maxId = await this.findMaxId();

        if(amount < 0 || !amount){
            throw new Error("Invalid amount")
        }

        let messages = [];
        let amountOfMessages = 0;


        for(let i = (maxId-amount-1)<0?0:maxId-amount-1;i < maxId;i++){
            messages[amountOfMessages] = await privateChat.findOne({id : i});
            amountOfMessages++;
        }

        return messages;

    }



    
}

module.exports = new GroupService();
