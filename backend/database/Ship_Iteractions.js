const mongoose = require("mongoose");
const Ship = require("./models/Ship");
const Route = require("./models/Route");
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
	const shipFound = await Ship.find({name: shipName}).select(["-_id", "-__v"]);
	return {found:shipFound.length > 0, payload: shipFound}
}

exports.getAllShips = async function(shipName) {
	const shipFound = await Ship.find().select(["-_id", "-__v"]).sort({name:1});
	return {found: shipFound.length, payload: shipFound}
}

exports.verifyUserIsShipOwner = async function(personName) {
    const shipFound = await Ship.find({owner: personName}).select(["-_id", "-__v"]);
	return {found: shipFound.length > 0, payload: shipFound[0]} //ship return an array, but we know the relation is 1-1, so just take the first element
}

exports.registerShip = async function(shipData) {
    const shipCreated = await Ship.create({name : shipData.name,
                                            choosed_route: shipData.choosed_route,
                                            actual_position: shipData.actual_position,
                                            owner: shipData.owner});
    return shipCreated
}

exports.setAllarmStatus = async function(shipName) {
    const shipFound = await Ship.find({name: shipName}).select(["-_id", "-__v"]);
    console.log(shipFound)
    if(shipFound.length === 0) 
        return {status: "error", message: "The choosed ship does not exist"}
    await Ship.updateOne({name: shipName}, 
            {$set: {status: 'allarm'}})
    return {status: "success", message: "Status changed to allarm"}
}

exports.setNormalStatus = async function(shipName) {
    const shipFound = await Ship.find({name: shipName}).select(["-_id", "-__v"]);
    if(shipFound.length === 0) 
        return {status: "error", message: "The choosed ship does not exist"}
    await Ship.updateOne({name: shipName}, 
            {$set: {status: 'normal'}})
    return {status: "success", message: "Status changed to normal"}
}

exports.getAllShips_NormalStatus = async function() {
    const shipFound = await Ship.find({status: "normal"}).select(["-_id", "-__v"]).sort({name:1});
	return {found: shipFound.length, payload: shipFound}
}

exports.getAllShips_AllarmStatus = async function() {
    const shipFound = await Ship.find({status: "allarm"}).select(["-_id", "-__v"]).sort({name:1});
	return {found: shipFound.length, payload: shipFound}
}

exports.changeShipOwner = async function(shipName, newOwner) {
    const shipFound = await Ship.find({name: shipName}).select(["-_id", "-__v"]);
    if(shipFound.length === 0)
        return {status: false}
    await Ship.updateOne({name: shipName}, 
        {$set: {owner: newOwner}})
    return {status: "success", message: "Owner changed successfully"}
}

exports.changeShipName = async function(shipName, newName) {
    //first, check if ship exists
    const shipFound = await Ship.find({name: shipName}).select(["-_id", "-__v"]);
    if(shipFound.length === 0)
        return {status: "error", message: "No ship with the specified name"}
    //now check if exists a ship with the new name
    const shipNew = await Ship.find({name: newName}).select(["-_id", "-__v"]);
    if(shipNew.length === 1)
        return {status: "error", message: "There is already a ship with the specified name"}

    await Ship.updateOne({name: shipName}, 
        {$set: {name: newName}})
    return {status: "success", message: "Name changed successfully"}
}

exports.getShipsWithRoute = async function(routeName) {
    const shipFound = await Ship.find({choosed_route: routeName}).select(["-_id", "-__v"]).sort({name:1});
	return {found: shipFound.length, payload: shipFound}
}

exports.changeRoute = async function(shipName, newRoute) {
    const shipFound = await Ship.find({name: shipName}).select(["-_id", "-__v"]);
    if(shipFound.length === 0)
        return {status: "error", message: "Ship not found"}
    const routeFound = await Route.find({name: newRoute}).select(["-_id", "-__v"]);
    if(routeFound.length === 0)
        return {status: "error", message: "Route not found"}
    await Ship.updateOne({name: shipName}, 
        {$set: {choosed_route: newRoute}})
    return {status: "success", message: "Route changed successfully"}
}