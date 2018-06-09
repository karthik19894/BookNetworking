const express=require('express'),
router=express.Router();

const User=require('../models/user'),
passport=require('passport');



router.get('/',(req,res)=>{
    res.render('landing');
});


//AUTH ROUTES

//Show the register form

router.get('/register',function(req,res){
    res.render('register',{page:"register"});
});

router.post('/register',function(req,res){
    var newUser=new User({username:req.body.username,email:req.body.email,country:req.body.country});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render('register',{error:err.message});
        }
        passport.authenticate("local")(req,res,function(err,user){
            res.redirect('/books');
            req.flash("success", "Welcome to Book Networking " + user.username);
        
    });
});
});
//show login form

router.get('/login',function(req,res){
    res.render('login',{page:"login"});
});

//posting login

router.post('/login',passport.authenticate("local",{
    successRedirect:'/books',
    failureRedirect:'/login',
    failureFlash:true
}),function(req,res){
    
});

//LOGOUT Routes

router.get('/logout',function(req,res){
    req.logout();
    req.flash("success", "Successfully Logged Out");
    res.redirect('/books');
});





module.exports=router;
