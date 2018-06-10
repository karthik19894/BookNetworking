var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

passport.use(new FacebookStrategy({
    clientID: '249606868923189',
    clientSecret: '793231727e62eca4b8d9c8e5ba407ef6',
    callbackURL: "http://localhost:8088/auth/facebook/callback"
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