const mongoose = require("mongoose");
const Ship = require("./models/Ship");
const utils = require('../Utils')

mongoose.connect("mongodb://localhost/webProject", 
		() => {console.log("Ship service connected")},
		e => console.error("Ship service crashed: " + e.message)
);

exports.shipAlreadyExisting = async function(shipName) {
    const ret = await exports.getSingleShip(shipName)
    return ret.found
}

exports.getSingleShip = async function(shipName) {
	const shipFound = await Ship.find({name: shipName}).select('-_id');
	return {found:userFound.length > 0, payload: shipFound}
}

exports.getAllShips = async function(shipName) {
	const shipFound = await Ship.find().select('-_id');
	return {found: shipFound.length, payload: shipFound}
}

//TODO finire di vedere se va e come funziona
exports.registerShip = async function(credentials) {
    if(!credentials.hasOwnProperty("status")) {
        const shipCreated = await Ship.create({name : credentials.name,
                                                choosed_route: credentials.choosed_route,
                                                actual_position: credentials.actual_position,
                                                status : credentials.status});
    }
    else 
        if(!credentials.hasOwnProperty("status")) {
            const shipCreated = await Ship.create({name : credentials.name,
                                                    choosed_route: credentials.choosed_route,
                                                    actual_position: credentials.actual_position});
            }
    
}