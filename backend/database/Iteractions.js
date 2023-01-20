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

exports.createUser = async function(user, password) {
	const pass = passVerifier.encryptPassword(password)
    const userCreated = await User.create({username : user,
											password: pass.hash_pass,
		 									salt: pass.salt,
											token : pass.token});
}

exports.userAlreadyExists = async function(user) {
	const userFound = await User.find({username: user})
	return userFound.length > 0
}

exports.loginViaCredentials = async function(credentials) {
	const salt = await getSalt(credentials.username) //get the salt of the user
	if(salt.length === 0) //if no salt found, the user selected is not existing
		return {"found": false}
	//get the user
	const userFound = await User.find({username: credentials.username,
									password: passVerifier.encryptPasswordGivedSalt(credentials.password, salt.payload).hash_pass})
	return {"found":userFound.length > 0, "payload": userFound}
}

exports.loginViaToken = async function(userToken) {
	const userFound = await User.find({token: userToken})
	return {"found":userFound.length > 0, "payload": userFound}
}