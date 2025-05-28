const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customerreg", // Reference to the user who is creating the ticket
      required: true,
    },
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
    category: {
      type: String,
      enum: ["Billing", "Technical", "Product Issue", "Feedback", "Other"],
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
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
      ref: "customerservicereg",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = {
  Ticket: mongoose.model("ticket", ticketSchema),
};
