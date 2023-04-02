const express = require("express");
const router = require('express').Router();
const path = require('path');

const controller = require('../controllers/quotes.js');

router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);

router.delete('/:id', controller.del);

module.exports = router;
