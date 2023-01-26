const express = require('express');
const db = require('../database/Login_Iteractions');
const router = express.Router();
const utils = require('../Utils')
const models = require('../data_models/models')
router.use(express.json());


//request login based on token
router.get('/token/:token', async function(req, res) {
    const response = await db.loginViaToken(req.params.token); 
    if(!response.found) {
        res.json({status: "error", message: "No user found. Login with credentials"})
        return;
    }
    res.json({status: "success", message: "correct credentials", payload: response.payload})
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
router.put("/register", async function(req, res) {
    //verify if the request are corrects
    if (!utils.matches(req.body, models.loginCredentials())) {
        res.send('Request body is invalid. Provide an username and password');
        return;
    }
    //verify if the password have the standards required
    if(!await utils.verifyPassword(req.body.password, res))
        return;
    //if all checks passed, then check if user already exists
    if(await db.userAlreadyExists(req.body.username)) {
        res.json({status: "error", message: "There is already another user with the same username. Please choose another one"})
        return
    }
    //finally, all check are fine, so register the user
    res.json(await db.createUser(req.body, res))
});


//request for changing password. Syntax: {"username": "","password": ""} with password containing the new password
router.post("/change/password", async function(req, res) {
    //verify if the request are corrects
    if (!utils.matches(req.body, models.loginCredentials())) {
        res.send('Request body is invalid. Provide an username and password');
        return;
    }
    if(!await utils.verifyPassword(req.body.password, res))
        return;
    //finally, all check are fine, so register the user
    const response = await db.changePassword(req.body)
    res.json(response)
});


//request for changing username. Syntax: {"username": "","newusername": ""} with username containing old username, newusername the new one
router.post("/change/user", async function(req, res) {
    //verify if the request are corrects
    if (!utils.matches(req.body, models.changeUserUsername())) {
        res.send('Request body is invalid. Provide an username and newusername fields');
        return;
    }
    //finally, all check are fine, so register the user
    res.json(await db.changeUsername(req.body))
});


module.exports = router