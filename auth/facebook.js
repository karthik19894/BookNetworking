var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

passport.use(new FacebookStrategy({
    clientID: process.env.FBCLIENTID,
    clientSecret: process.env.FBCLIENTSECRET,
    callbackURL: "http://localhost:"+process.env.PORT+"/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({username: profile.displayName}, {username: profile.displayName}, function(err, user) {
        console.log(profile);
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

module.exports = passport;