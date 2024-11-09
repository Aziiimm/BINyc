const express = require("express");
const axios = require("axios");
const cors = require("cors");
const db = require("./config/mongo.js");

// const bodyParser = require("body-parser");
// const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// app.use(bodyParser.json());

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
    const data = req.body.form;
    
    console.log(data);

    try {
        // TODO: INSERT DATA
        res.status(201).json({ message: "Data inserted successfully", result });
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

app.get("/api/data", async (req, res) => {

    try {
    
    } 
    catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    } 
});