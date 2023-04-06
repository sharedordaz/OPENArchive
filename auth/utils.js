const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');

const mongoclient = require('../db/connect.js');
const User = mongoclient.getDB().db('OPENArchive').collection("githubUsers");

const clientID = process.env.CLIENT_APP_ID;
const secret = process.env.CLIENT_APP_SECRET;

var GitHubStrategy = require('passport-github').Strategy;


passport.use(new GitHubStrategy({
  clientID: clientID,
  clientSecret: secret,
  callbackURL: "http://localhost:8000/auth/callback"
},
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function(err, user) {
      return cb(err, user);
    });
  }
));


module.exports = {

}


