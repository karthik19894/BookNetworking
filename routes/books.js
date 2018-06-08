var express=require('express'),
router=express.Router(),
Book=require('../models/book');

//Route for displaying All the available Books
router.get('/',function(req,res){
   if(req.query.search) {
       const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get the books based on the search 
        //Check for the search type-- if user has chosen name or isbn
        if(req.query.searchType==='Name'){
            Book.find({title: regex}, function(err, allBooks){
                if(err){
                    console.log(err);
                } else {
                   res.render("books/index",{books:allBooks});
                }
             });

        }
        else {
            Book.find({isbn: regex}, function(err, allBooks){
                if(err){
                    console.log(err);
                } else {
                   res.render("books/index",{books:allBooks});
                }
             });

        }
       
    } 
    else {
        // Get all books from DB
        Book.find({}, function(err, allBooks){
           if(err){
               console.log(err);
           } else {
              res.render("books/index",{books:allBooks});
           }
     
    })
    }
    
});





//Route For Displaying the Add New Book to the Global Catalogue Form
router.get('/new',(req,res)=>{
    res.render('books/newbook');
});

//Route for displaying the Detailed Description of the Book
router.get('/:id',(req,res)=>{
    Book.findById(req.params.id,(err,foundBook)=>{
        if(err)console.log(err);
        else res.render('books/show',{book:foundBook});
    });
});




//POST Route for pusing new book to the database
router.post('/',(req,res)=>{
    //Getting the book details from the form through body parser
    const new_book=req.body.book;

    Book.create(new_book,(err,created_book)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("New Book Added Successfully");
            res.redirect('/books');
        }
    });


});


function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;