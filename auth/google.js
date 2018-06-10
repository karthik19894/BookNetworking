var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: "952021953094-0r931qboagbjn651onik34gbked2i52r.apps.googleusercontent.com",
    clientSecret: "ooOKT-ajvvMjbIflhOkdwROj",
    callbackURL: "http://localhost:"+process.env.PORT+"/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ email: profile.email }, { username: profile.displayName,email:profile.email  }, function (err, user) {
         return done(err, user);
       });
  }
));

module.exports = passport;