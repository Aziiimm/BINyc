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

// Set up multer for file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Endpoint for form submission
app.post("/api/form", upload.single("image"), async (req, res) => {
  try {
    // Log the received data for debugging
    console.log("Received body:", req.body);
    console.log("Received file:", req.file);

    const database = await db();
    const reportsCollection = database.collection("garbageReport");

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

// Endpoint to serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
