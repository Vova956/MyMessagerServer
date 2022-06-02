class UserDTO{
    login;
    password;
    nickname;

    constructor(login = '',password = '',nickname = ''){
        this.login = login
        this.password = password
        this.nickname = nickname
    }

    static copy(obj){
        return new UserDTO(obj.login,obj.password,obj.nickname);
    }

}

module.exports = UserDTO