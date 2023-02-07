const mongoose = require("mongoose");

//define the schema of the user in the DB
const messageSchema = new mongoose.Schema({
	sender: String,
    reciver: String,
    message: String,
    counter: Number
});

//export the model of the schema created
module.exports = mongoose.model("Message", messageSchema)