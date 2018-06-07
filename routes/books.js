var express=require('express'),
router=express.Router(),
Book=require('../models/book');

 

router.get('/',function(req,res){
    Book.find({},function(err,books){
    if(err){
        console.log("error",err.message);
    }
    else
    {
        res.render('books/index',{books:books});
    }
    
})
});


module.exports = router;