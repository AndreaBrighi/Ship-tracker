const mongoose = require("mongoose");
const User = require("./models/User");
const passVerifier = require('../PasswordVerification');
const ship_Iter = require('./Ship_Iteractions')
const utils = require('../Utils')

mongoose.connect("mongodb://localhost/webProject", 
		() => {console.log("Login service connected")},
		e => console.error("Login service crashed: " + e.message)
);

async function getSalt(user) {
	const salt = await User.find({username: user})
	const vals = await utils.queryToJSON(salt)
	return {"found": salt.length > 0, "payload": vals.salt}
}

exports.createUser = async function(credentials, res) {
	const pass = await passVerifier.encryptPassword(credentials.password)
	var userCreated = ""

	if(credentials.hasOwnProperty("userType")) {
		if(['user', 'controller'].includes(credentials.userType)) {
			userCreated = await User.create({username : credentials.username,
													password: pass.hash_pass,
													salt: pass.salt,
													token : pass.token,
													userType: credentials.userType});
		}
		else {
			res.status(400).send({
				message: "User type can only be user or controller"
			});
			return;
		}
	}
	else {
		userCreated = await User.create({username : credentials.username,
			password: pass.hash_pass,
			salt: pass.salt,
			token : pass.token,
			userType: credentials.userType});
	}
	return {status: "success", message: "User successfully created", payload: {token: userCreated.token, userType: userCreated.userType}}
}

exports.userAlreadyExists = async function(user) {
	const userFound = await User.find({username: user})
	return userFound.length > 0
}

exports.tokenAlreadyExists = async function(token) {
	const userFound = await User.find({token: token})
	return userFound.length > 0
}

exports.loginViaCredentials = async function(credentials) {
	const salt = await getSalt(credentials.username) //get the salt of the user
	if(salt.length === 0) //if no salt found, the user selected is not existing
		return {found: false}
	//get the user
	const userFound = await User.find({username: credentials.username,
									password: await(await passVerifier.encryptPasswordGivedSalt(credentials.password, salt.payload)).hash_pass})
	const ownShip = await ship_Iter.verifyUserIsShipOwner(credentials.username)
	const data = {token: userFound[0].token, userType: userFound[0].userType}
	return {found:userFound.length > 0, payload: {data, ship: {own: ownShip.found, payload: ownShip.payload}}}
}

exports.loginViaToken = async function(userToken) {
	const userFound = await User.find({token: userToken})
	if(userFound.length === 0 ) 
		return {found:userFound.length > 0 }
	const ownShip = await ship_Iter.verifyUserIsShipOwner(userFound[0].username)
	const data = {token: userFound[0].token, userType: userFound[0].userType}
	return {found:userFound.length > 0, payload: {data, ship: {own: ownShip.found, payload: ownShip.payload}}}
}

exports.changePassword = async function(credentials) {
	//first, we have to check if the user exists. If not, then return error message
	const userFound = await User.find({username: credentials.username})
	if(userFound.length === 0) 
		return {found: false, message: "user does not exists"}
	
	const genPassword = await passVerifier.encryptPassword(credentials.password)
	await User.updateOne({username: credentials.username}, 
						{$set: {password : genPassword.hash_pass, salt: genPassword.salt, token: genPassword.token}})
	return {status: "success", message: "Password changed successfully"}
}

exports.changeUsername = async function(credentials) {
	//first, we have to check if the user exists. If not, then return error message
	const userFound = await User.find({username: credentials.username})
	if(userFound.length === 0) 
		return {found: false, message: "user does not exists"}
	
	await User.updateOne({username: credentials.username}, 
						{$set: {username: credentials.newusername}})
	return {status: "success", message: "Username changed successfully"}
}