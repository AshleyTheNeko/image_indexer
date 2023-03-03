import { MongoClient } from "mongodb";

const uri = `mongodb://${process.env.MDBHOST}:27017/accounts`;
const client = new MongoClient(uri);

export default client;
