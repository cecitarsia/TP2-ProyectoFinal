require("dotenv").config();

const mongoclient = require("mongodb").MongoClient;

const uri = process.env.MONGODB;

const client = new mongoclient(uri);

let instance = null;

async function getConnection() {
  if (instance == null) {
    try {
      instance = await client.connect();
    } catch (error) {
      console.log(error.message);
      throw new Error("Problemas en la conexión con MondoDB");
    }
  }
  return instance;
}

module.exports = { getConnection };
