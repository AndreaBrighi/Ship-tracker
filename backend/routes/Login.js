const express = require('express');
const db = require('../database/Login_Iteractions');
const router = express.Router();
const utils = require('../Utils')


//request login based on token
router.get('/token/:token', async function(req, res) {
    const response = await db.loginViaToken(req.params.token); 
    if(!response.found) {
        res.json({status: "error", message: "Token expired"})
        return;
    }
    res.json({status: "success", message: "correct credentials", payload: (await utils.queryToJSON(response.payload)).token })
});


//request login based on credentials
router.get("/credentials/:credentials", async function(req, res) {
    const credentials = JSON.parse(req.params.credentials);
    //verify if the credential syntax is correct
    if(!await utils.verifyCredentialSyntax_LoginUsername(credentials, res))
        return;
    //if no user has been found, return error message
    const response = await db.loginViaCredentials(credentials); 
    if(!response.found) {
        res.json({status: "error", message: "Wrong credentials"})
        return;
    }
    res.json({status: "success", message: "correct credentials", payload: response.payload})
});


//request creation of new user. Syntax: {"username": "","password": ""}
router.put("/register/:credentials", async function(req, res) {
    const credentials = JSON.parse(req.params.credentials);
    //verify if the credential syntax is correct
    if(!await utils.verifyCredentialSyntax_LoginUsername(credentials, res))
        return;
    //verify if the password have the standards required
    if(!await utils.verifyPassword(credentials.password, res))
        return;
    //if all checks passed, then check if user already exists
    if(await db.userAlreadyExists(credentials.username)) {
        res.json({status: "error", message: "There is already another user with the same username. Please choose another one"})
        return
    }
    //finally, all check are fine, so register the user
    res.json(await db.createUser(credentials, res))
});


//request for changing password. Syntax: {"username": "","password": ""} with password containing the new password
router.post("/change/password/:credentials", async function(req, res) {
    const credentials = JSON.parse(req.params.credentials);
    //verify if the credential syntax is correct
    if(!await utils.verifyCredentialSyntax_LoginUsername(credentials, res))
        return;
    if(!await utils.verifyPassword(credentials.password, res))
        return;
    //finally, all check are fine, so register the user
    const response = await db.changePassword(credentials)
    res.json(response)
});


//request for changing username. Syntax: {"username": "","newusername": ""} with username containing old username, newusername the new one
router.post("/change/user/:credentials", async function(req, res) {
    const credentials = JSON.parse(req.params.credentials);
    //verify if the credential syntax is correct
    if(!await utils.verifyCredentialSyntax_ChageUsername(credentials, res))
        return;
    //finally, all check are fine, so register the user
    const response = await db.changeUsername(credentials)
    res.json(response)
});


module.exports = router