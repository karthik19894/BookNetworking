const mongoose=require('mongoose');


const bookSchema=new mongoose.Schema({
    title:String,
    isbn:String,
    author:String,
    image:String,
    description:String,
    created_user:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
});

module.exports=mongoose.model('Book',bookSchema);