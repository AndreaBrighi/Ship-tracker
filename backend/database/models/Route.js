const mongoose = require("mongoose");

//define the schema of the user in the DB
const routeSchema = new mongoose.Schema({
	name: String,
	cities: {
        starting_city: String,
        ending_city: String
    },
});

//export the model of the schema created
module.exports = mongoose.model("Ship", routeSchema)