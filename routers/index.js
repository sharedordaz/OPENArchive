//THIS IS THE MAIN ROUTER, IT REDIRECTS YOU TO OTHER ROUTERS
const express = require("express");
const { is } = require("express/lib/request.js");
const router = require('express').Router();

const path = require('path');

router.use("/", require('./home.js'));

router.use("/auth", require('./auth.js'));

router.use("/users", require('./users.js'));

router.use("/books", require('./books.js'));

router.use("/talks", require('./talks.js'));

router.use("/quotes", require('./quotes.js'));

router.use("/images", require('./images.js'));

router.use("/api-docs", require("./swagger.js"));

//THE EVERYTHING ELSE ROUTER
router.get('*', (req, res, next) => {
  res.status(404).send("<h1>Undefined Route</h1>");
})

module.exports = router;
