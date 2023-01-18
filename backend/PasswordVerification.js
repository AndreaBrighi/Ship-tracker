const crypto = require('crypto')
const { passwordStrength } = require('check-password-strength')
const re = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");

const hashIteration = 100


function makeSalt(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.encryptPassword = function(password) {
    
    const salt = makeSalt(128) //first, generate the salt.    
    var middle = Math.floor(password.length / 2); //divide the password in two parts

    //password is mixed with the salt
    const newPass = salt + password.substr(0, middle) + salt + password.substr(middle) + salt
    
    var hash = crypto.createHash('sha512').update(newPass).digest('base64');
    for(var i = 0; i < hashIteration-1; i++) {
        hash = crypto.createHash('sha512').update(hash).digest('base64');
    }
    return hash
};
exports.verytyPasswordStandards = function(password) {
    return re.test(password)
};
exports.verifyPasswordStrength = function(password) {
    return passwordStrength(password).value
};