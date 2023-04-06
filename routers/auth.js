const dotenv = require("dotenv");
const express = require("express");
const router = require('express').Router();
const passport = require('passport');

var GitHubStrategy = require('passport-github').Strategy;


const path = require('path');

router.get("/", passport.authenticate('github'));

router.get('/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {

    res.redirect("/");
  }
)

module.exports = router;
