const { MongoClient } = require("mongodb");
require("dotenv").config();

const url = process.env.MONGODB_URL;
let database;

const connectDb = async () => {
  const client = await MongoClient.connect(url);
  database = client.db("feeling-diary");
};

const getDb = () => {
  if (!database) {
    throw new Error("연결이 실패했습니다.");
  }
  return database;
};

module.exports = {
  connectDb,
  getDb,
};
