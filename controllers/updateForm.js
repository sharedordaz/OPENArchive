const express = require('express');
const app = express();

const mongoclient = require("../db/connect.js");
const ObjectId = require('mongodb').ObjectId;

const path = require('path');
//const fs = require('fs');

//---------------------------//
const DB_NAME = "OPENArchive";
const COLLECTION = "users";
//---------------------------//

function ShowAccount(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var age = req.body.age;
  var description = req.body.description;
  var password = req.body.password;

  const HTML = `<ul><li>First Name: ${firstName}</li> <li>Last Name: ${lastName}</li> <li> Email: ${email} <li> Age: ${age} </li> <li> Description: ${description}  </li> <li> Password: ${password} </li> </ul> `;

  //res.send(`<p> ${req.body[0]}</p>`);
  //res.send(HTML + "You are funny");
  return HTML;
}

function updateAcc(req, res) {
  //reads from the HTML the userId (A hidden input). This will be received from the session.
  const userId = req.body.userId;
  const doc = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
    description: req.body.description,
    password: req.body.password
  };
  const collection = mongoclient.getDB().db(DB_NAME).collection(COLLECTION);

  const result = collection.replaceOne({ _id: userId }, doc);
  if (result) {
    let accountInfo = ShowAccount(req, res);
    console.log(accountInfo);
    res.sendFile(path.join(__dirname, '../view/registered.html'))
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the contact.');
  }
  console.log(`A document was inserted with the _id ${result.insertedId}`)
}

function delAcc(req, res) {
  const userId = req.body.userId;
  const collection = mongoclient.getDB().db(DB_NAME).collection(COLLECTION);
  const result = collection.deleteOne({ _id: userId }, true);

  if (result.deletedCount > 0) {
    res.status(200).sendFile(path.join(__dirname, '../view/registered.html'))
  } else {
    res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
  }

}

//If you want to export a function, you need to wrap it in a {}
module.exports = {
  ShowAccount,
  updateAcc,
  delAcc
};


