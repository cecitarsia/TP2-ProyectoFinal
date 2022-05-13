const mongoclient = require('mongodb').MongoClient;

const uri = "mongodb+srv://mibase:mibase@cluster0.zlhpe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new mongoclient(uri);

let instance = null;

async function getConnection(){
    let instance = await client.connect();
    return instance;
}

module.exports = {getConnection};