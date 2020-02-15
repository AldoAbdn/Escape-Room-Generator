/**
 * Class for User
 * @author Alistair Quinn
 */
class User {
    /**
     * Creates a User
     * @param {string} email 
     * @param {string} token 
     * @param {bool} verified 
     */
    constructor(email, token, verified){
        this.email = email;
        this.token = token;
        this.verified = verified;
    }  
}

export default User;