const groupService = require('../Service/groupService')
const UserDTO = require('../DTO/userDTO')

class AuthController{

    async postMessage(req,res,next){
        try{
            const {nickname,message} = req.body
            
            const result = await groupService.postMessage(nickname,message);
            return res.json({result})
            
        }catch(e){
            next(e)
        }

    }

    async getUsers(req,res,next){
        try{
            const {login} = req.body
            
            const result = await groupService.getUsers(login);
            return res.json({result})
            
        }catch(e){
            next(e)
        }

    }

    async addAdmin(req,res,next){
        try{
            const {login,nickname,password} = req.body
            
            const result = await groupService.addAdmin(login,nickname,password);
            return res.json({result})
            
        }catch(e){
            next(e)
        }

    }

    async addUser(req,res,next){
        try{
            const {adminPassword,login,nickname,password} = req.body
            
            const result = await groupService.addUser(adminPassword,login,nickname,password);
            return res.json({result})
            
        }catch(e){
            next(e)
        }

    }

    async getChat(req,res,next){
        try{
            const {amount} = req.body
            
            const result = await groupService.getMessages(amount);
            return res.json({result})
            
        }catch(e){
            next(e)
        }

    }

    

}

module.exports = new AuthController();