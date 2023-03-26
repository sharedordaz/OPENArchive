const express = require('express');
const router = require('express').Router();
const path = require('path');

//EVEN IF THE IMAGES FOLDER DOESNT EXIST, WE ARE CALLING THE IMAGE AT THE VIEW FOLDER WITH /images/RHEL
router.get('/RHEL.jpg', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../view/images/RHEL.jpg'));
})

module.exports = router;
