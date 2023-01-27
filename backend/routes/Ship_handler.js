const express = require('express');
const db = require('../database/Ship_Iteractions');
const router = express.Router();
const utils = require('../Utils')
const models = require("../data_models/models")
router.use(express.json());


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


router.put("/register", async function(req, res) {
    //verify if the request are corrects
    if (!utils.matches(req.body, models.registerShip())) {
        res.status(400).send({
            message: "Invalid request. Check documentation for syntax"
        });
        return;
    }

    //check if the name is already been used
    if(await db.shipAlreadyExisting(req.body.name)) {
        res.json({status: "error", message: "ship name already used"})
        return;
    }
    const result = await utils.resultToJSON(await db.registerShip(req.body))
    res.json({status: "success", message: "Ship registered successfully", payload: result})
});


router.post("/change/toallarm/:shipName", async function(req, res) {
    res.json(await db.setAllarmStatus(req.params.shipName))
});


router.post("/change/tonormal/:shipName", async function(req, res) {
    res.json(await db.setNormalStatus(req.params.shipName))
});

router.post("/change/owner", async function(req, res) {
    //verify if the request are corrects
    if (!utils.matches(req.body, models.newShipOwner())) {
        res.status(400).send({
            message: "Invalid request. Check documentation for syntax"
        });
        return;
    }
});

module.exports = router