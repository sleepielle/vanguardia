/*const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017/vanguardia";

MongoClient.connect(uri, function (err, client) {
  if (err) {
    console.log("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión exitosa a la base de datos");

    const db = client.db("mydatabase");
    const collection = db.collection("mycollection");
    collection.find({}).toArray(function (err, docs) {
      if (err) {
        console.log("Error al consultar la colección:", err);
      } else {
        console.log("Documentos encontrados:", docs);
      }
      client.close();
    });
  }
});
*/
