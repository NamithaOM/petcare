const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      default: "Manual Entry", // Manual Entry, Contact Form, Referral, etc.
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Converted", "Dropped"],
      default: "New",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "salesrepresentativereg",
      default: null,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = { Lead: mongoose.model("Lead", leadSchema) };
