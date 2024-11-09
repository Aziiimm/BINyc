const { MongoClient } = require("mongodb");

require("dotenv").config();

const db = async () => {
  const URI = process.env.MONGODB_URI || "";

  if (URI === "") { throw new error("please provide ya mongodb uri bro"); }

  const client = new MongoClient(URI);
  
  let conn;
  try {
    conn = await client.connect();
  } catch (e) {
    console.error(e);
  }
  let db = conn.db("reports");
  return db;
};

module.exports = {
  db,
};
