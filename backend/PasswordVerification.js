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


function generateSalt(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.encryptPassword = function(password) {
    
    const salt = generateSalt(128) //first, generate the salt.    
    var middle = Math.floor(password.length / 2); //divide the password in two parts

    //password is mixed with the salt
    const newPass = salt + password.substr(0, middle) + salt + password.substr(middle) + salt
    
    var hash = crypto.createHash('sha512').update(newPass).digest('base64');
    for(var i = 0; i < hashIteration-1; i++) {
        hash = crypto.createHash('sha512').update(hash).digest('base64');
    }
    return hash
};
exports.verifyPasswordStandards = function(password) {
    return re.test(password)
};
exports.verifyPasswordStrength = function(password) {
    return passwordStrength(password).value
};