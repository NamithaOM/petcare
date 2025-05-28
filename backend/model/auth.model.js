const mongoose = require("mongoose");

const customerRegSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const customerServiceRegSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
    },
    workLocation: {
      type: String,
      required: true,
    },
    shiftTiming: {
      type: String,
      enum: ["Morning", "Night"],
      required: true,
    },
    workType: {
      type: String,
      enum: ["Remote", "Office"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const salesRepresentativeRegSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
    },
    workLocation: {
      type: String,
      required: true,
    },
    commissionRate: {
      type: String,
      enum: ["5%", "10%", "15%", "20%"],
      required: true,
    },
    workType: {
      type: String,
      enum: ["Remote", "Office"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const loginSchema = new mongoose.Schema(
  {
    regId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "regType",
      required: true,
    },
    regType: {
      type: String,
      enum: ["customerreg", "customerservicereg", "salesrepresentativereg"],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    usertype: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = {
  Customer: mongoose.model("customerreg", customerRegSchema),
  CustomerService: mongoose.model(
    "customerservicereg",
    customerServiceRegSchema
  ),
  SalesRepresentative: mongoose.model(
    "salesrepresentativereg",
    salesRepresentativeRegSchema
  ),
  Login: mongoose.model("login", loginSchema),
};
