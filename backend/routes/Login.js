const express = require('express');
const db = require('../database/Iteractions');
const router = express.Router();
const passVerifier = require('../PasswordVerification');

//request login based on token
router.get('/token', function(req, res) {
    res.json({status: "success", message: passVerifier.generateToken()})
});

//request login based on credentials
router.get("/credentials/:id/:pass", async function(req, res) {
    //res.json({status: "error", message: "Wrong credentials"})
});

//request creation of new user. Syntax: {"username": ,"password": }
router.get("/register/:credentials", async function(req, res) {
    const credentials = JSON.parse(req.params.credentials);
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

    await db.createUser(credentials.username, credentials.password)
    res.json({status: "success", message: "User successfully created"})
});


module.exports = router