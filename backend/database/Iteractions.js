const mongoose = require("mongoose");
const User = require("./User");
const passVerifier = require('../PasswordVerification');

mongoose.connect("mongodb://localhost/webProject", 
		() => {console.log("connected to db")},
		e => console.error(e)
);

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