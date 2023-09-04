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

router.get("/getallfor/:name", async function(req, res) {
    res.json((await db.getAllShipsFor(req.params.name)).payload)
});


router.get("/getall", async function(req, res) {
    res.json((await db.getAllShips()).payload)
});


router.get("/getall/allarm", async function(req, res) {
    res.json((await db.getAllShips_AllarmStatus()).payload)
});


router.get("/getall/normal", async function(req, res) {
    res.json((await db.getAllShips_NormalStatus()).payload)
});

router.get("/getall/byroute/:route", async function(req, res) {
    res.json(await db.getShipsWithRoute(req.params.route))
});


router.post("/register", async function(req, res) {
    //verify if the request are corrects
    if (!utils.matches(req.body, models.registerShip())) {
        res.status(400).send(
            "Invalid request. Check documentation for syntax"
        );
        return;
    }

    //check if the name is already been used
    if(await db.shipAlreadyExisting(req.body.name)) {
        res.status(400).send("ship name already used")
        return;
    }
    const result = await utils.resultToJSON(await db.registerShip(req.body))
    res.json(result)
});


router.put("/change/toallarm/:shipName", async function(req, res) {
    res.json(await db.setAllarmStatus(req.params.shipName))
});


router.put("/change/tonormal/:shipName", async function(req, res) {
    res.json(await db.setNormalStatus(req.params.shipName))
});

router.put("/change/shipname", async function(req, res) {
    //verify if the request are corrects
    if (!utils.matches(req.body, models.newShipName())) {
        res.status(400).send("Invalid request. Check documentation for syntax"
        );
        return;
    }
    res.json(await db.changeShipName(req.body.shipname, req.body.newname))
});

router.put("/change/route", async function(req, res) {
    //verify if the request are corrects
    if (!utils.matches(req.body, models.shipChangeRoute())) {
        res.status(400).send("Invalid request. Check documentation for syntax"
        );
        return;
    }
    res.json(await db.changeRoute(req.body.shipname, req.body.newroute))
});

router.put("/change/position", async function(req, res) {
    //verify if the request are corrects
    if (!utils.matches(req.body, models.shipChangePosition())) {
        res.status(400).send("Invalid request. Check documentation for syntax");
        return;
    }
    res.json(await db.changePosition(req.body.shipname, req.body.newposition))
});


module.exports = router