require("dotenv").config();
const {MongoClient, ObjectId} = require("mongodb"); 

const monghost = 'mongodb://127.0.0.1:27017';
const mongdatabase = 'diaryREISV';

let singleton;


async function connect() {

    if(singleton) return singleton;

    const client = new MongoClient(monghost)
    await client.connect();

    singleton = client.db(mongdatabase); 
    return singleton;

}

async function insert(user){
    const db = await connect(); 
    return db.collection("postagem").insertOne(user);

}

async function find(){
    const db = await connect(); 
    return db.collection("postagem").find().toArray();

}
async function remove(id){

    const db = await connect(); 
    return db.collection("postagem").deleteOne({_id:new ObjectId(id) })

}
async function edit(id) {
    const db = await connect();
    const objectId = new ObjectId(id);
    return db.collection("postagem").findOne({ _id: objectId });
}
async function atualiza(id, autor, descricao, data, sentimento) {
    const db = await connect();
    const result = await db.collection("postagem").updateOne(
      { _id: new ObjectId(id) },
      { $set: { autor, descricao, data, sentimento } }
    );
    return result;
}







module.exports = {

    insert,
    find, 
    remove, 
    edit,
    atualiza

}