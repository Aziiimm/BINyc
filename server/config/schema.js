const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, match: /^https?:\/\/.+\.(jpg|jpeg|png)$/, required: false },
    location: { type: String, required: true },
    time: { type: Date, required: true },
    bounty: { type: String, default: null },
    locationType: { type: String, enum: ["Street", "Sidewalk"], required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
});

module.exports = mongoose.model("Report", reportSchema);