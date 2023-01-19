const mongoose = require("mongoose");
const User = require("./User");
const passVerifier = require('../PasswordVerification');

mongoose.connect("mongodb://localhost/webProject", 
		() => {console.log("connected to db")},
		e => console.error(e)
);

exports.createUser = async function(user, password) {
    const userCreated = await User.create({username : user,
											password: passVerifier.encryptPassword(password),
		 									salt: "maybe",
											token : "none"});
}

exports.userAlreadyExists = async function(user) {
	const userFound = await User.find({username: user})
	console.log(userFound + " " + userFound.length)
	if(userFound.length > 0)
		return "found user"
	else
		return "not found"
}