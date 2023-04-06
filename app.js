const express = require("express");
const connect = require('./db/connect.js');
const port = 8000 || process.env.PORT;
const app = express();

const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

app.use(session({
  secret: process.env.CLIENT_APP_SECRET,
  resave: false,
  saveUninitialized: false
}));

app
  //Because this .use doesnt have mount point (/), is sended to all the apps
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    require("./auth/utils.js");
    next();
  })

//.use(require("./auth/utils.js"))

app.use('/', require('./routers'));




//Require to start the db correctly, if not the app.listen doesnt run
connect.startDB((err) => {
  if (err) {
    console.log("Another error! Funny thing\n Error: " + err);
  }
  else {
    app.listen(port);
    console.log(`App running on port ${port}`);
  }
})


