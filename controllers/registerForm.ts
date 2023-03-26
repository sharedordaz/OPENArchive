const express = require('express');
const app = express();

const mongoclient = require("../db/connect.js");
const ObjectId = require('mongodb').ObjectId;

const path = require('path');
//const fs = require('fs');

function ShowAccount(req, res) {
  var firstName: any = req.body.firstName;
  var lastName: any = req.body.lastName;
  var email: any = req.body.email;
  var age: any = req.body.age;
  var description: any = req.body.description;
  var password: any = req.body.password;

  const HTML: string = `<ul><li>First Name: ${firstName}</li> <li>Last Name: ${lastName}</li> <li> Email: ${email} <li> Age: ${age} </li> <li> Description: ${description}  </li> <li> Password: ${password} </li> </ul> `;

  //res.send(`<p> ${req.body[0]}</p>`);
  //res.send(HTML + "You are funny");
  return HTML;
}

function registerNew(req, res) {
  const doc: {} = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
    description: req.body.description,
    password: req.body.password
  };
  const collection: any = mongoclient.getDB().db("LDSForum").collection("users");


  const result = collection.insertOne(doc);
  if (result) {
    let accountInfo = ShowAccount(req, res);
    console.log(accountInfo);
    res.sendFile(path.join(__dirname, '../view/registered.html'))
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the contact.');
  }
  console.log(`A document was inserted with the _id ${result.insertedId}`)
}

//If you want to export a function, you need to wrap it in a {}
module.exports = {
  ShowAccount,
  registerNew
};


