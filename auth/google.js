var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GCLIENTID,
    clientSecret: process.env.GCLIENTSECRET,
    callbackURL: "https://"+process.env.IP+":"+process.env.PORT+"/auth/google/callback"
  },
  
  function(token, refreshToken, profile, done) {

    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(function() {

        // try to find the user based on their google id
        User.findOne({ email : profile.email }, function(err, user) {
            if (err)
                return done(err);

            if (user) {

                // if a user is found, log them in
                return done(null, user);
            } else {
                // if the user isnt in our database, create a new user
                var newUser          = new User();

                // set all of the relevant information
                newUser.id    = profile.id;
                newUser.username  = profile.displayName;
                newUser.email = profile.emails[0].value; // pull the first email

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    });

}));


module.exports = passport;