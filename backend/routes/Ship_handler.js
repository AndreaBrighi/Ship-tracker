const express = require('express');
const db = require('../database/Ship_Iteractions');
const router = express.Router();
const utils = require('../Utils')


//request login based on credentials
router.get("/getsingle/:name", async function(req, res) {
    //if no user has been found, return error message
    res.json(await db.getSingleShip(req.params.name))
});


//request creation of new user. Syntax: {"username": "","password": ""}
router.get("/getall", async function(req, res) {
    res.json(await db.getAllShips())
});

router.put("/register/:credential", async function(req, res) {
    const credentials = JSON.parse(req.params.credentials);
    //check if credentials are presents
    if(!utils.verifyCredentialSyntax_ShipRegister(credentials, res))
        return;
    //check if the name is already been used
    if(await db.shipAlreadyExisting(credentials.name)) {
        res.json({status: "error", message: "ship name already used"})
        return;
    }
    
});
module.exports = router