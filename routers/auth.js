const express = require("express");
const router = require('express').Router();

const path = require('path');

router.use("/", (req, res) => {
  res.send("Auth route");
});

module.exports = router;
