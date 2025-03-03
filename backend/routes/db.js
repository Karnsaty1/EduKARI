const {MongoClient}=require('mongodb');


const userName = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSCODE);
const db_name=process.env.MONGO_DB;
let db_1;

const connectDB=async()=>{
    try {
        const client=new MongoClient(process.env.MONGO_URL);
        await client.connect();
        console.log('connected 🌍🌎🌏!!!');
        db_1=client.db(db_name)
    } catch (error) {
        console.log(error);
    }
}


const getDb = (collectionName) => {
    if (!db_1) {
        console.error("Database not connected !!! Call the connectDB first !!!");
        return;
    }
    console.log(db_1);
    return db_1.collection(collectionName);
};

module.exports = { connectDB, getDb };