const mongoose = require("mongoose");
const User = require("./User");
const passVerifier = require('../PasswordVerification');
const utils = require('../Utils')

mongoose.connect("mongodb://localhost/webProject", 
		() => {console.log("connected to db")},
		e => console.error(e)
);

async function getSalt(user) {
	const salt = await User.find({username: user})
	const vals = await utils.queryToJSON(salt)
	return {"found": salt.length > 0, "payload": vals.salt}
}

exports.createUser = async function(credentials) {
	const pass = await passVerifier.encryptPassword(credentials.password)
    const userCreated = await User.create({username : credentials.username,
											password: pass.hash_pass,
		 									salt: pass.salt,
											token : pass.token});
	return userCreated.token
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
									password: await passVerifier.encryptPasswordGivedSalt(credentials.password, salt.payload).hash_pass})
	return {found:userFound.length > 0, payload: userFound}
}

exports.loginViaToken = async function(userToken) {
	const userFound = await User.find({token: userToken})
	return {found : userFound.length > 0, payload: userFound}
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