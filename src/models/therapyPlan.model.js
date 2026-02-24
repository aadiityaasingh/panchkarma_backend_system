const mongoose = require("mongoose");

const therapyItemSchema = new mongoose.Schema(
  {
    therapy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapy",
      required: true
    },
    durationDays: {
      type: Number,
      required: true,
      min: 1
    },
    costPerDay: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const therapyPlanSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    therapies: {
      type: [therapyItemSchema],
      required: true
    },

    status: {
      type: String,
      enum: ["planned", "ongoing", "completed", "cancelled"],
      default: "planned"
    },

    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const TherapyPlan = mongoose.model("TherapyPlan", therapyPlanSchema);

module.exports = TherapyPlan;