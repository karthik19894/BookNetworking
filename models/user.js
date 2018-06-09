var mongoose = require('mongoose');
var bcrypt=require('bcryptjs');
var passportLocalMongoose=require('passport-local-mongoose');
var UserSchema=mongoose.Schema({
    username:String,
	password:String,
	email:String,
	country:String
});


UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', UserSchema);