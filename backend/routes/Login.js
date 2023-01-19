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

//request creation of new user
router.get("/creation/:credentials", async function(req, res) {
    const credentials = JSON.parse(req.params.credentials);
    //verify if the password have the minimum requirements
    if(!passVerifier.verifyPasswordStandards(credentials.password))
        res.json({status: "error", message: "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"})
    //check if the password is easy guessable
    if(["Too weak", "Weak"].includes(passVerifier.verifyPasswordStrength(credentials.password)))
        res.json({status: "error", message: "Your password is very weak and guessable. Try a different password"})
    //if all checks passed, then check if user already exists
    res.send(await db.userAlreadyExists(credentials.username))
});


module.exports = router