const userService = require('../Service/authService')
const UserDTO = require('../DTO/userDTO')

class AuthController{
    async registration(req,res,next){
        try{
            const {login, password, nickname} = req.body
            const payload = new UserDTO(login,password,nickname)

            const result = await userService.registration(payload);

            return res.json({result})

        }catch(e){
            next(e)
        }

    }

    async getUsers(req,res,next){
        try{
           
            const result = await userService.getUsers();
            return res.json({result})

        }catch(e){
            next(e)
        }

    }

    async login(req,res,next){
        try{
            const {login, password, nickname} = req.body
            const result = await userService.login({login: login,password: password,nickname: nickname});
            
            return res.json({result});


        }catch(e){
            next(e)
        }
    }

}

module.exports = new AuthController();