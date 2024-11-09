const { MongoClient } = require("mongodb");

require("dotenv").config();

const db = async () => {
  const connectionString = process.env.MONGODB_URI || "";

  if (connectionString === "") {
    throw new error("please provide ya mongodb uri bro");
  }

  const client = new MongoClient(connectionString);
  let conn;
  try {
    conn = await client.connect();
  } catch (e) {
    console.error(e);
  }
  let db = conn.db("Reports");
  return db;
};

module.exports = {
  db,
};
