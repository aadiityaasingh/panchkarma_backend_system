const { body } = require("express-validator");

const createTherapyValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Therapy name is required"),

  body("category")
    .isIn([
      "vamana",
      "virechana",
      "basti",
      "nasya",
      "raktamokshana"
    ])
    .withMessage("Invalid therapy category"),

  body("defaultDurationDays")
    .isInt({ min: 1 })
    .withMessage("Duration must be at least 1 day"),

  body("baseCost")
    .isFloat({ min: 0 })
    .withMessage("Base cost must be positive")
];

module.exports = {
  createTherapyValidation
};