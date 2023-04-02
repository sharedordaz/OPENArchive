const mongoclient = require("../db/connect.js");
const ObjectId = require('mongodb').ObjectId;

//---------------------------//-
const DB_NAME = "OPENArchive";
const COLLECTION = "quotes";
//---------------------------//

const getAll = async (req, res, next) => {
  try {
    dbo = mongoclient.getDB().db(DB_NAME);
    collection = dbo.collection(COLLECTION);
    result = await collection.find();
    resultArray = result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  }
  catch (e) {
    console.log("Funny error" + e)
  }
}

const getSingle = async (req, res, next) => {
  try {
    //get GET userId (from URL) req.params = $_GET in PHP
    const userId = new ObjectId(req.params.id);
    result = mongoclient.getDB().db(DB_NAME).collection(COLLECTION).find({ _id: userId })
    await result.toArray().then((lists) => {
      console.log('Single Contact Data example: \nId: ' + lists[0]);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    })
  } catch (error) {
    res.status(404).send("<p>Couldn't access to database!\n <hr>Error: </p>\t" + error);
  }
}

const del = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);

  const collection = mongoclient.getDB().db(DB_NAME).collection(COLLECTION);
  const result = await collection.deleteOne({ _id: userId }, true);

  if (result.deletedCount > 0) {
    res.status(204).send("DELETE request sucessful");
  } else {
    res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  del
};
