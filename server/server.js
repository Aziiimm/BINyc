const express = require("express");
const cors = require("cors");
const { db } = require("./config/mongo");
const Report = require("./models/report");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const upload = multer({ dest: "uploads/" });

// Endpoint for form submission
app.post("/api/form", upload.single("image"), async (req, res) => {
  try {
    
    const file = req.file;
    const database = await db();
    const reportsCollection = database.collection("garbageReport");

    const ipfsHashes = await Promise.all(
      files.map(async (file) => {
        const ipfsHash = await uploadToIPFS(file.path, description);
        return ipfsHash;
      })
    );

    const report = {
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.path : null, // Path to the uploaded image
      location: req.body.location,
      time: req.body.time,
      bounty: req.body.bounty,
      locationType: req.body.locationType,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      CID: ipfsHashes,
    };

    const result = await reportsCollection.insertOne(report);

    res.status(201).json({
      message: "Data inserted successfully",
      report: { _id: result.insertedId, ...report },
    });

  } catch (error) {
    console.error("Error inserting data:", error.message);
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
});

app.get("/api/data", async (req, res) => {
  try {
    const database = await db();
    const reportsCollection = database.collection("garbageReport");

    const data = await reportsCollection.find({}).toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
});

