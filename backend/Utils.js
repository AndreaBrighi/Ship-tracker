exports.verifyCredentialSyntax = async function(credentials, res) {
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

exports.queryToJSON = async function(query) {
    return JSON.parse(JSON.stringify(query[0]));
}