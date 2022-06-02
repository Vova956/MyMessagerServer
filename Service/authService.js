const UserDTO = require("../DTO/userDTO");
const userModel = require('../Models/usersModel');
const tokenService = require('../Service/tokenService');


class AuthService{
    async login(userDTO){
        const candidate = await userModel.findOne({login: userDTO.login,password: userDTO.password,nickname: userDTO.nickname})
        

        if(!candidate){
            throw new Error('There is no such user')
        }

        const token = tokenService.generateToken({login: userDTO.login,password: userDTO.password,nickname: userDTO.nickname});

        return {
            access: token,
            user: {login: userDTO.login,password: userDTO.password,nickname: userDTO.nickname}
        }
        
    }
    
    async getUsers(){
        const candidate = await userModel.find({});
        return candidate

        //userModel.deleteOne({...})
        //deleteMany
        //updateMany({...},{...})
        //updateOne({...})

    }

    async registration(userDTO){

        const loginCandidate = await userModel.findOne({login : userDTO.login})
        const nickCandidate = await userModel.findOne({nickname : userDTO.nickname})

        if(loginCandidate){
            throw new Error('Current login exists')
        }

        if(nickCandidate){
            throw new Error('Current nickname exists')
        }

        const user = await userModel.create({login: userDTO.login,password: userDTO.password,nickname: userDTO.nickname})
        
        const token = tokenService.generateToken({login: userDTO.login,password: userDTO.password,nickname: userDTO.nickname});

        return {
            access: token,
            user: {login: userDTO.login,password: userDTO.password,nickname: userDTO.nickname}
        }
    }

    
}

module.exports = new AuthService();