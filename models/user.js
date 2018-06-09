var mongoose = require('mongoose');
var bcrypt=require('bcryptjs');
var passportLocalMongoose=require('passport-local-mongoose');
var UserSchema=mongoose.Schema({
    username:String,
	password:String,
	email:{type:String,unique:true},
	country:String,
	catalogue:[{type:mongoose.Schema.Types.ObjectId,
	ref:"Book"}]
});


UserSchema.plugin(passportLocalMongoose);

UserSchema.statics.findOrCreate = require("find-or-create");

module.exports = mongoose.model('User', UserSchema);