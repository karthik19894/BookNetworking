var express=require('express'),
router=express.Router(),
middleware=require('../middleware'),
User=require('../models/user'),
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
router.get('/new',middleware.isLoggedIn,(req,res)=>{
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
router.post('/',middleware.isLoggedIn,(req,res)=>{
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

//Route for adding books to the user's catalog
router.get('/add/:book_id',middleware.isLoggedIn,function(req,res){
    console.log('hit the route for adding to catalogue');
    console.log(req.user);
    console.log(req.user._id);
    const currentUser=req.user;
    book_id=req.params.book_id;
    User.findById(currentUser._id,function(err,foundUser){
        if(err){
            console.log(err);
        }
        else{
            Book.findById(book_id,(err,foundBook)=>{
                foundUser.catalogue.push(foundBook);
                foundUser.save();
                console.log("Added to the User's Catalogue");
            })
            return res.redirect('/books/'+currentUser._id+'/catalogue');
        }
    })




});

//Route For Viewing an User's Catalogue

router.get('/:user_id/catalogue',middleware.isLoggedIn ,function (req, res) {
      User.findById(req.params.user_id)
      .then(
        (foundUser) =>
          Promise.all(
            foundUser.catalogue.map(
              book_id=>Book.findById(book_id)
            )
          )
      ).then(
        userBooks=>res.render('catalogue/catalogue_books', { books: userBooks })
      );
    }
  );



function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;