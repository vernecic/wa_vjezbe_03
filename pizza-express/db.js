import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

let mongoURI = process.env.MONGO_URI;
let db_name = process.env.MONGO_DB_NAME;

const connectToDatabase = async () => {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();
    console.log("Spajanje na bazu uspješno!");
    let db = client.db(db_name);
    return db;
  } catch (e) {
    console.error(e);
  }
};

export default connectToDatabase;
