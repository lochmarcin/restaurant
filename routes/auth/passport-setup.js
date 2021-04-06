const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  //User.findById(id, function(err, user) {
    done(null, user);
  //});
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/login/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.use(new FacebookStrategy({
  clientID: process.env.FB_CLIENT_IT,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/fb/login/secrets"
},
function(accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
  return done(null, profile);
}
));