const express=require('express'),
app=express(),
bodyParser=require('body-parser'),
mongoose=require('mongoose'),
flash=require('connect-flash'),
passport=require('passport'),
methodOverride=require('method-override');

//Getting the routes
const indexRoutes=require('./routes/index_routes');
const bookRoutes=require('./routes/books.js');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(require('express-session')({
    secret:"Some secret",
    resave:false,
    saveUninitialized:false
}));
app.use(flash());
app.use(methodOverride("_method"));



app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

//Using the routes
app.use('/',indexRoutes);
app.use('/books',bookRoutes);


//Listening for the App Server
app.listen(8088,function(){
    console.log("Book Networking Application has Started :) ");
});