const express = require('express');
const db = require('../database/Route_Iteractions');
const router = express.Router();
const models = require("../data_models/models")
const utils = require("../Utils")
router.use(express.json());


router.get("/getall", async function(req, res) {
    res.json(await db.getAllRoutes())
});

router.get("/getroute/:name", async function(req, res) {
    res.json(await db.getRoute(req.params.name))
})

router.get("/getall/tocity/:endingCity", async function(req, res) {
    res.json(await db.getRoutesWithEndingCity(req.params.endingCity))
})


module.exports = router