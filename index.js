const express=require('express'),
app=express(),
bodyParser=require('body-parser'),
mongoose=require('mongoose'),
flash=require('connect-flash'),
passport=require('passport'),
LocalStrategy=require('passport-local'),
User=require('./models/user'),
methodOverride=require('method-override');

//Connecting to the MLAB MongoDB
mongoose.connect("mongodb://karthik:karthik123@ds151970.mlab.com:51970/book_networking",function(){
    console.log("Connected to Database");
});

require('./models/config/passport')(passport);

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
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
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