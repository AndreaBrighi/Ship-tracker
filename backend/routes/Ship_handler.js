const express = require('express');
const db = require('../database/Ship_Iteractions');
const router = express.Router();
const utils = require('../Utils')


router.get("/getsingle/:name", async function(req, res) {
    //if no user has been found, return error message
    res.json(await db.getSingleShip(req.params.name))
});


router.get("/getall", async function(req, res) {
    res.json(await db.getAllShips())
});


router.get("/getall/allarm", async function(req, res) {
    res.json(await db.getAllShips_AllarmStatus())
});


router.get("/getall/normal", async function(req, res) {
    res.json(await db.getAllShips_NormalStatus())
});


router.put("/register/:credentials", async function(req, res) {
    console.log(req.params.credentials)
    const credentials = JSON.parse(req.params.credentials);
    //check if credentials are presents
    if(!utils.verifyCredentialSyntax_ShipRegister(credentials, res))
        return;
    //check if the name is already been used
    if(await db.shipAlreadyExisting(credentials.name)) {
        res.json({status: "error", message: "ship name already used"})
        return;
    }
    const result = utils.queryToJSON(await db.registerShip(credentials))
    res.json({status: "success", message: "Ship registered successfully", payload: result})
});


router.post("/change/toallarm/:shipName", async function(req, res) {
    res.json(await db.setAllarmStatus(req.params.shipName))
});


router.post("/change/tonormal/:shipName", async function(req, res) {
    res.json(await db.setNormalStatus(req.params.shipName))
});


module.exports = router