const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ["admin", "doctor", "therapist"],
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);