import { MongoClient, MongoClientOptions } from "mongodb";

const uri = `mongodb://${process.env.MONGO_HOST}:27017/typesense`;
const client = new MongoClient(uri);

export default client;
