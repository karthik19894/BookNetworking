const mongoose=require('mongoose');


const catalogueSchema=new mongoose.Schema({
    catalogue_title:String,
    owner:{
        user:{
            id:mongoose.Schema.Types.ObjectId,
            ref:"User"},
        name:String
    }
    }
);

module.exports=mongoose.model('Catalogue',catalogueSchema);