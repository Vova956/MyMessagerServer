const tokenService = require("../Service/tokenService");


module.exports = (req,res,next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            throw new Error('Auth header is empty')
        }
        console.log(authHeader);

        const accessToken = authHeader.split(' ')[1];
        if(!accessToken){
            throw new Error("Auth token invalid")
        }
       

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData){
            throw new Error("Invalid token")
        }

        req.user = userData

        return next();
    }catch(e){

        return next(e);
    }


    next();
}