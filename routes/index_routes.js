const express=require('express'),
router=express.Router();

const User=require('../models/user'),
passport=require('passport');

var passportFacebook = require('../auth/facebook');

var passportGoogle = require('../auth/google');


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

//Facebook AUTH Routes
router.get('/auth/facebook', passportFacebook.authenticate('facebook', { 
    scope : ['public_profile', 'email']
  }));

  // handle the callback after facebook has authenticated the user
  router.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
          successRedirect : '/books',
          failureRedirect : '/'
      }));


//Google Auth Routes
router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));


router.get('/auth/google/callback',
  passportGoogle.authenticate('google', { successRedirect:'/books',failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
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
