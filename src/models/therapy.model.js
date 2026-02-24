const mongoose = require("mongoose");

const therapySchema = new mongoose.Schema({
     name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    category: {
      type: String,
      enum: [
        "vamana",
        "virechana",
        "basti",
        "nasya",
        "raktamokshana"
      ],
      required: true
    },

    defaultDurationDays: {
      type: Number,
      required: true,
      min: 1
    },

    baseCost: {
      type: Number,
      required: true,
      min: 0
    },

    description: {
      type: String
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
});

module.exports = mongoose.model("Therapy", therapySchema);