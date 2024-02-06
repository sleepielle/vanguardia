var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config();
const mongokey = process.env.MONGO_DB;
// Replace the uri string with your connection string.
const uri = mongokey;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
    return;
  }

  const db = client.db("Vanguardia");
  const collection = db.collection("Libreria");
  collection.find({}).toArray((err, docs) => {
    if (err) {
      console.error("Error querying documents:", err);
      return;
    }

    console.log(docs);
  });
  client.close();
});

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
