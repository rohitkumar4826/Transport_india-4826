// User.js
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');
var User = new mongoose.Schema({
	username: {
		type: String
		
	},
	password: {
		type: String
	},
	firstname:{
		type:String
	},
	email:{
		type:String
	}
	
})

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User)
