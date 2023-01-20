const express = require('express');
const db = require('../database/Iteractions');
const router = express.Router();
const passVerifier = require('../PasswordVerification');
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
    if(!await utils.verifyCredentialSyntax(credentials, res))
        return;
    //if no user has been found, return error message
    const response = await db.loginViaCredentials(credentials); 
    if(!response.found) {
        res.json({status: "error", message: "Wrong credentials"})
        return;
    }
    res.json({status: "success", message: "correct credentials", payload: (await utils.queryToJSON(response.payload)).token })
});

//request creation of new user. Syntax: {"username": "","password": ""}
// {"username":"user", "password": "abAB99&5"}
router.get("/register/:credentials", async function(req, res) {
    console.log("something called me")
    const credentials = JSON.parse(req.params.credentials);
    //verify if the credential syntax is correct
    if(!await utils.verifyCredentialSyntax(credentials, res))
        return;
    //verify if the password have the minimum requirements
    if(!passVerifier.verifyPasswordStandards(credentials.password)) {
        res.json({status: "error", message: "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"})
        return
    }
    //check if the password is easy guessable
    if(["Too weak", "Weak"].includes(passVerifier.verifyPasswordStrength(credentials.password))) {
        res.json({status: "error", message: "Your password is very weak and guessable. Try a different password"})
        return 
    }
    //if all checks passed, then check if user already exists
    if(await db.userAlreadyExists(credentials.username)) {
        res.json({status: "error", message: "There is already another user with the same username. Please choose another one"})
        return
    }
    //finally, all check are fine, so register the user
    await db.createUser(credentials.username, credentials.password)
    res.json({status: "success", message: "User successfully created"})
});


module.exports = router