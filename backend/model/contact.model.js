const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "resolved", "rejected"],
      default: "pending",
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customerservicereg", // Reference to customer service user
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = {
  Contact: mongoose.model("contact", contactSchema),
};
