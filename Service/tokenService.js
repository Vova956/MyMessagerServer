const jwt = require('jsonwebtoken')

class TokenService{
    generateToken(payload){
        const accessToken = jwt.sign(payload,process.env.SECRET_ACCESS_TOKEN,
            {expiresIn:'10h'});

        return accessToken;
    }

    validateAccessToken(token){
        try{
            const data = jwt.verify(token,process.env.SECRET_ACCESS_TOKEN)
            return data;
        }catch(e){
            return null;
        }
    }

}
module.exports = new TokenService();