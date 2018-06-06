var express=require('express'),
router=express.Router(),
middleware=require('../middleware'),
Book=require('../models/books');

 

router.get('/',function(req,res){
    Books.find({},function(err,books){
    if(err){
        console.log("error",err.message);
    }
    else
    {
        res.render('books/index',{books:books});
    }
    
})
});



router.post('/',middleware.isLoggedIn,function(req,res){
    var title=req.body.title;
    var isbn=req.body.isbn;
    var author=req.body.author;
    var image=req.body.image;
    var desc=req.body.description;
    

    var book = {title: title,isbn:isbn,author:author, image: image, description: desc };
    // Create a new campground and save to DB
    Book.create(book,function(err,book)
    {
        if(err){
            console.log(err);
        }
        else
        {
            console.log("Book Added Successfully");
            res.redirect('/books');
        }
    });
    
    
});


router.get('/new',middleware.isLoggedIn,function(req,res)
{
    res.render('books/newbook');
});

router.get("/:id", function(req, res){
    //find the campground with provided ID
    Book.findById(req.params.id).populate("comments").exec(function(err, foundBook){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("books/show", {book: foundBook});
        }
    });
});

//Edit Routes

router.get('/:id/edit',middleware.checkBookOwnership,function(req,res){
   Book.findById(req.params.id,function(err,foundBook){
       if(err){
           console.log(err);
       }
       else
       {
           res.render("books/edit",{book:foundBook});
       }
   }) 
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCatalogueOwnership, function(req, res){
    
    Book.findByIdAndUpdate(req.params.id, req.body.book, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/books/" + book._id);
        }
    });
  });

//Destroy Routes

router.delete('/:id/delete',middleware.checkBookOwnership,function(req,res){
    Book.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }
        res.redirect('/books');
    })    
});





module.exports = router;