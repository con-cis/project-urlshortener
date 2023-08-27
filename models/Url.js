// URL Model Description:
// Defines a Mongoose schema and model for URL data storage.
// The schema includes fields for original URL and optional short URL.
// Allows interaction with MongoDB using Mongoose library.

const mongoose = require("mongoose");

// Define the URL schema
const urlSchema = new mongoose.Schema({
  original_url: { type: String, required: true },
  short_url: { type: Number, default: null },
  created_at: { type: Date, default: Date.now },
});

// Create a model named "Url" based on the schema
const Url = mongoose.model("Url", urlSchema);

module.exports = Url;