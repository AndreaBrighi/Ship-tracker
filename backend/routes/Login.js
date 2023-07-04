const express = require('express');
const db = require('../database/Login_Iteractions');
const router = express.Router();
const utils = require('../Utils')
const models = require('../data_models/models')
router.use(express.json());


router.get('/token/:token', async function(req, res) {
    const response = await db.loginViaToken(req.params.token); 
    if(!response.found) {
        res.json({status: "error", message: "No user found. Login with credentials"})
        return;
    }
    res.json(response.payload)
});


router.post("/credentials", async function(req, res) {
    const credentials = req.body;
    if (!utils.matches(credentials, models.loginCredentials())) {
        res.send('Request body is invalid. Provide an username and password');
        return;
    }
    //if no user has been found, return error message
    const response = await db.loginViaCredentials(credentials); 
    if(!response.found) {
        res.status(401).send('Wrong credentials')
        return;
    }
    res.json(response.payload)
});


router.post("/register", async function(req, res) {
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


router.put("/change/password", async function(req, res) {
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


router.put("/change/user", async function(req, res) {
    //verify if the request are corrects
    if (!utils.matches(req.body, models.changeUserUsername())) {
        res.send('Request body is invalid. Provide an username and newusername fields');
        return;
    }
    //finally, all check are fine, so register the user
    res.json(await db.changeUsername(req.body))
});


module.exports = router