const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;
function startDB(callback) {
  if (_db) {
    console.log("Db is already started");
    return callback(null, _db);
  }
  MongoClient.connect(process.env.DB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
      console.log("DB Connected")
    })
    .catch((error) => { console.log("You got an error loser! " + error); })
};

function getDB() {
  if (!_db) {
    throw Error("DB not initialized");
  }
  return _db;
};

module.exports = {
  startDB,
  getDB
};
