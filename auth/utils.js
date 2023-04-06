const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');

const mongoclient = require('../db/connect.js');
const User = mongoclient.getDB().db('OPENArchive').collection("githubUsers");

const clientID = process.env.CLIENT_APP_ID;
const secret = process.env.CLIENT_APP_SECRET;
const callback = process.env.CALLBACK;

var GitHubStrategy = require('passport-github').Strategy;


passport.use(new GitHubStrategy({
  clientID: clientID,
  clientSecret: secret,
  callbackURL: callback
},
  function(accessToken, refreshToken, profile, cb) {
    console.log(`ClientID: ${clientID}  Secret: ${secret}  CallbackURL: ${callback}`);
    User.insertOne({ githubId: profile.id, githubName: profile.username }, function(err, result) {
      if (err) { console.log(err); return cb(err); }

      const user = { _id: result.insertedId, githubId: profile.id };
      return cb(null, user);
    });
    /*  User.findOrCreate({ githubId: profile.id }, function(err, user) {
        return cb(err, user);
      });*/
  }
));



