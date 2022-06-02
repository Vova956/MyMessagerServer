const chatService = require('../Service/chatService')
const UserDTO = require('../DTO/userDTO')

class AuthController{
    async postMessage(req,res,next){
        try{
            const {nickname,message} = req.body

            
            
            const result = await chatService.postMessage(nickname,message);
            return res.json({result})
            
        }catch(e){
            next(e)
        }

    }

    async getMessages(req,res,next){
        try{
            const {amount} = req.body
            console.log(amount);

            const result = await chatService.getMessages(amount)
            return res.json({result})

        }catch(e){
            next(e)
        }
    }

    async getAmount(req,res,next){
        try{

            const result = await chatService.findMaxId()
            return res.json({result});

        }catch(e){
            next(e)
        }
    }

    async getAllMessages(req,res,next){
        try{

            const result = await chatService.getAllMessages()
            return res.json({result});

        }catch(e){
            next(e)
        }
    }

    

}

module.exports = new AuthController();