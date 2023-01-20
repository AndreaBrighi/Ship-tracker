const crypto = require('crypto')
const { passwordStrength } = require('check-password-strength')
const re = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
/*Minimum eight characters
at least one uppercase letter
one lowercase letter
one number 
one special character
*/
const hashIteration = 50
const saltLenght = 128


exports.encryptPassword = function(password) {
    const salt = crypto.randomBytes(saltLenght).toString('hex') //first, generate the salt.    
    var middle = Math.floor(password.length / 2); //divide the password in two parts

    //password is mixed with the salt
    const newPass = salt + password.substr(0, middle) + salt + password.substr(middle) + salt
    
    var hash = crypto.createHash('sha512').update(newPass).digest('hex');
    for(var i = 0; i < hashIteration-1; i++) {
        hash = crypto.createHash('sha512').update(hash).digest('hex');
    }
    return {"hash_pass": hash, "salt": salt, "token": crypto.randomBytes(saltLenght).toString('hex')}
};


exports.encryptPasswordGivedSalt = function(password, salt) {
    var middle = Math.floor(password.length / 2); //divide the password in two parts

    //password is mixed with the salt
    const newPass = salt + password.substr(0, middle) + salt + password.substr(middle) + salt
    
    var hash = crypto.createHash('sha512').update(newPass).digest('hex');
    for(var i = 0; i < hashIteration-1; i++) {
        hash = crypto.createHash('sha512').update(hash).digest('hex');
    }
    return {"hash_pass": hash, "salt": salt}
};

exports.generateToken = function() {
    return crypto.randomBytes(saltLenght).toString('hex');
};

exports.verifyPasswordStandards = function(password) {
    return re.test(password)
};

exports.verifyPasswordStrength = function(password) {
    return passwordStrength(password).value
};