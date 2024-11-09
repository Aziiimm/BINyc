const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    time: { type: String, required: true },
    bounty: { type: String, default: null },
    locationType: { type: String, enum: ["Street", "Sidewalk"], required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
});

module.exports = mongoose.model("Report", reportSchema);