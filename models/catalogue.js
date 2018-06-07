const mongoose=require('mongoose');


const catalogueSchema=new mongoose.Schema({
    catalogue_title:String,
    owner:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"},
        name:String
    },
    book_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    }
    }
);

module.exports=mongoose.model('Catalogue',catalogueSchema);