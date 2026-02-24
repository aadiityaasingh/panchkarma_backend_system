const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true
    },

    dateOfBirth: {
      type: Date,
      required: true
    },

    phone: {
      type: String,
      required: true,
      unique: true
    },

    address: {
      type: String
    },

    emergencyContact: {
      name: String,
      phone: String
    },

    medicalNotes: {
      type: String
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Patient", patientSchema);