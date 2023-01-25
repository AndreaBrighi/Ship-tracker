const mongoose = require("mongoose");

//define the schema of the user in the DB
const shipSchema = new mongoose.Schema({
	name: String,
	choosed_route: String,
	actual_position: {
        x: Number,
        y: Number
    },
	status: { 
		type: String,
		enum: ['normal','allarm'],
		default: 'normal'
	},
	owner: String
});

//export the model of the schema created
module.exports = mongoose.model("Ship", shipSchema)