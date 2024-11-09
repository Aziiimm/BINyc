const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { db } = require("./config/mongo");
const Report = require("./models/report");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

/* 
    {
        "title":"placeholder",
        "Description":"placeholder",
        "Image":"JPG OR PNG FORMAT",
        "Location":"COuld be longitude/latitude or be a streetadreess/location",
        "Time":"Current time",
        "Bounty":"Bounty reward if any, otherwise NULL"
        "Location type":"Street or sidewalk",
        //Reporting persons contact info
        "Name":"",
        "Phone Number":"",
        "email":"",
    } 
*/

app.post("/api/form", async (req, res) => {
    try {
        const database = await db();
        const usersCollection = database.collection("garbageReport");

        const report = new Report({
            title : req.body.title,
            description: req.body.description,
            image: req.body.image,
            location: req.body.location,
            time: req.body.time,
            bounty: req.body.bounty,
            locationType: req.body.locationType,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
        });

        const result = await usersCollection.insertOne(report);
        res.status(201).json({ message: "Data inserted successfully", report: result.ops[0] });
    } catch (error) {
        console.error("Error inserting data:", error.message);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

app.get("/api/data", async (req, res) => {
  try {
    const database = await db();
    const usersCollection = database.collection("garbageReport");

    const data = await usersCollection.find({}).toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
});
