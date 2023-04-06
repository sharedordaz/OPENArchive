const dotenv = require("dotenv");
const express = require("express");
const router = require('express').Router();
const passport = require('passport');

var GitHubStrategy = require('passport-github').Strategy;


const path = require('path');

router.get("/", passport.authenticate('github', { failureRedirect: '/error' }));

router.get('/callback', passport.authenticate('github', { failureRedirect: '/auth/cancel' }),
  function(req, res) {
    res.redirect("/registered");
  }
)
router.get("/cancel", (req, res) => {
  res.sendFile(path.join(__dirname, '../view/login.html'))
});
router.get("/registered", (req, res) => {
  res.send("Registered sucessfuly");
})
router.get('/error', (req, res) => { res.send("Something went wrong") });

module.exports = router;
