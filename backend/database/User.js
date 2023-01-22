const mongoose = require("mongoose");

//define the schema of the user in the DB
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	salt: String,
	token: String,
	userType: { 
		type: String,
		enum: ['user','controller'],
		default: 'user',
	}
});

//export the model of the schema created
module.exports = mongoose.model("User", userSchema)