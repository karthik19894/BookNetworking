const mongoose=require('mongoose');


const bookSchema=new mongoose.Schema({
    title:String,
    isbn:String,
    author:String,
    image:String,
    description:String
});

module.exports=mongoose.model('Book',bookSchema);