const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
    therapyPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TherapyPlan",
      required: true,
      unique: true
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    paidAmount: {
      type: Number,
      default: 0,
      min: 0
    },

    status: {
      type: String,
      enum: ["unpaid", "partial", "paid"],
      default: "unpaid"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);