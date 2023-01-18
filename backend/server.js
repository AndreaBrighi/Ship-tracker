#!/bin/sh
_=0// "exec" "/usr/bin/env" "node" "--experimental-repl-await" "$0" "$@"
const mongoose = require("mongoose");
const User = require("./User");
const passVerifier = require("./PasswordVerification")


mongoose.connect("mongodb://localhost/webProject", 
		() => {console.log("connected")},
		e => console.error(e)
);

console.log(passVerifier.encryptPassword("hello mr adams"))
console.log(passVerifier.verifyPasswordStandards("pAss@945ffdv"))

//const user = await User.create({username : "user1", password: "password", salt: "none", token : "none"})
// __v è il traking interno di moongose per la versione del dato