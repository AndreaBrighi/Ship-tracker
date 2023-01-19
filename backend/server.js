const mongoose = require("mongoose");
const User = require("./User");
const express = require('express');

const passVerifier = require("./PasswordVerification");
const app = express();
const port = 3000;

//first initialize mongoose connection to db
mongoose.connect("mongodb://localhost/webProject", 
		() => {console.log("connected to db")},
		e => console.error(e)
);
//second, start server on specified port
app.listen(port, () => console.log("Express server running on port " + port))

app.get('/verify/:pass', function(req, res) {
	if(passVerifier.verifyPasswordStandards(req.params.pass))
		res.json({message: passVerifier.verifyPasswordStrength(req.params.pass)})
	else
		res.json({status: "Error", message: "Password must be at least eight characters long, at least one uppercase letter, one lowercase letter, one number and one special character:"});
});

//const user = await User.create({username : "user1", password: "password", salt: "none", token : "none"})
// __v è il traking interno di moongose per la versione del dato