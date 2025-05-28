const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ticket",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customerreg",
      required: true,
    },
    supportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customerservicereg",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      enum: ["customer", "support"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = {
  Message: mongoose.model("message", messageSchema),
};
