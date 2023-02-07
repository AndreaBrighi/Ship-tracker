const mongoose = require("mongoose");
const Tower = require('./models/Tower')


//opening connection
mongoose.connect("mongodb://localhost/webProject", 
		() => {
            console.log("Tower service connected")
        },
		e => console.error("Error with routes service: " + e.message)
);

exports.getAll = async function() {
	const towerFound = await Tower.find().select(["-_id", "-__v"]).sort({name:1});
	return {found:towerFound.length > 0, payload: towerFound}
}

exports.getSingle = async function(nameTower) {
	const towerFound = await Tower.find({name: nameTower}).select(["-_id", "-__v"]);
	return {found:towerFound.length > 0, payload: towerFound[0]}
}