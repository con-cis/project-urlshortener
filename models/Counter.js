// Counter Model Description:
// Defines a Mongoose schema and model for a counter.
// The schema includes fields for id and counter value.
// Allows interaction with MongoDB using Mongoose library.

const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: {
    db: { type: String, default: "test" },
    coll: { type: String, default: "urls" },
  },
  seq_value: {
    type: Number,
  },
});

const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
