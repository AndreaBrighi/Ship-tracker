const express = require('express');
const db = require('../database/Tower_Iteractions');
const router = express.Router();
const models = require("../data_models/models")
const utils = require("../Utils")
router.use(express.json());


router.get("/getall", async function(req, res) {
    res.json(await db.getAll())
});

router.get("/getsingle/:name", async function(req, res) {
    res.json(await db.getSingle(req.params.name))
});


module.exports = router