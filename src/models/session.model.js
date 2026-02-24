const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    therapyPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TherapyPlan",
      required: true
    },

    therapy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapy",
      required: true
    },

    sessionDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["scheduled", "completed", "missed", "cancelled"],
      default: "scheduled"
    },

    notes: {
      type: String
    }
  },
  {
    timestamps: true
});

module.exports = mongoose.model("Session", sessionSchema);