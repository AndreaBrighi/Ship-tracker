const passVerifier = require('./PasswordVerification');


exports.verifyCredentialSyntax_LoginUsername = async function(credentials, res) {
    //first, check if the credential passed have the username field and the password
    if(!credentials.hasOwnProperty("username")) {
        res.status(400).send({
            message: "Credentials must contain the username field"
        });
        return false;
    }
    if(!credentials.hasOwnProperty("password")) {
        res.status(400).send({
            message: "Credentials must contain the password field"
        });
        return false;
    }
    return true;
}


exports.verifyCredentialSyntax_ChageUsername = async function(credentials, res) {
    //first, check if the credential passed have the username field and the password
    if(!credentials.hasOwnProperty("username")) {
        res.status(400).send({
            message: "Credentials must contain the username field"
        });
        return false;
    }
    if(!credentials.hasOwnProperty("newusername")) {
        res.status(400).send({
            message: "Credentials must contain the newusername field"
        });
        return false;
    }
    return true;
}

exports.verifyCredentialSyntax_ShipRegister = async function(credentials, res) {
    if(!credentials.hasOwnProperty("name")) {
        res.status(400).send({
            message: "Ship must contain the name field"
        });
        return false;
    }
    if(!credentials.hasOwnProperty("choosed_route")) {
        res.status(400).send({
            message: "Ship must contain the choosed_route field"
        });
        return false;
    }
    if(!credentials.hasOwnProperty("actual_position")) {
        res.status(400).send({
            message: "Ship must contain the actual_position field"
        });
        return false;
    }
    return true;
}

exports.queryToJSON = async function(query) {
    return JSON.parse(JSON.stringify(query[0]));
}

exports.verifyPassword = async function(password, res) {
    //verify if the password have the minimum requirements
    if(!passVerifier.verifyPasswordStandards(password)) {
        res.json({status: "error", message: "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"})
        return false
    }  
    //check if the password is easy guessable
    if(["Too weak", "Weak"].includes(passVerifier.verifyPasswordStrength(password))) {
        res.json({status: "error", message: "Your password is very weak and guessable. Try a different password"})
        return false
    } 
    return true
}