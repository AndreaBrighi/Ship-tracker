const passVerifier = require('./PasswordVerification');
var Validator = require('jsonschema').Validator;
var v = new Validator();

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
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
    if(!credentials.hasOwnProperty("owner")) {
        res.status(400).send({
            message: "Ship must contain the owner field"
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
        res.json({status: "error", message: "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"})
        return false
    }  
    return true
}

exports.matches = function(body, rules) {
    console.log("(UTILS) errors from validation: " + v.validate(body, rules).errors)
    return v.validate(body, rules).valid;
}