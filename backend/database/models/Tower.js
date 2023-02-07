const mongoose = require("mongoose");

//define the schema of the user in the DB
const towerSchema = new mongoose.Schema({
	name: String,
	position: {
        x: String,
        y: String
    },
});

//export the model of the schema created
module.exports = mongoose.model("Tower", towerSchema)