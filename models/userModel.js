const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://demo:mongo@cluster0.vw5ddrm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function create(user) {
    try {
        await client.connect();
        console.log("Connected");
    
        const db = client.db("Users_DB");
        const coll = db.collection("Users");
        const result = await coll.insertOne(user);
        console.log(result.insertedId);
      } finally {
        await client.close();
      }
    console.log(user);
}

async function update(id, user) {
    try {
        await client.connect();
        console.log("Connected");
    
        const db = client.db("Users_DB");
        const coll = db.collection("Users");
        const filter = {id};
        const updateDoc = {
          $set: {
            name: user.name,
            address: user.address
          }
        };
        const result = await coll.updateOne(filter, updateDoc);
        console.log("Number of documents updated: " + result.modifiedCount);
      } finally {
        await client.close();
      }
}

async function remove(name) {
  try {
    await client.connect();
    console.log("Connected");

    const db = client.db("Users_DB");
    const coll = db.collection("Users");
    const query = { name: name };
    const result = await coll.deleteOne(query);
    console.log("Number of documents deleted: " + result.deletedCount);
  } finally {
    await client.close();
  }
}

module.exports = {create, update, remove}