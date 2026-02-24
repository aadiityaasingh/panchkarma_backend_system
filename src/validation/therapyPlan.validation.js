const { body } = require("express-validator");

const createTherapyPlanValidation = [
  body("patient")
    .isMongoId()
    .withMessage("Invalid patient ID"),

  body("startDate")
    .isISO8601()
    .withMessage("Invalid start date"),

  body("endDate")
    .isISO8601()
    .withMessage("Invalid end date")
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.startDate)) {
        throw new Error("End date cannot be before start date");
      }
      return true;
    }),

  body("therapies")
    .isArray({ min: 1 })
    .withMessage("At least one therapy is required"),

  body("therapies.*.therapy")
    .isMongoId()
    .withMessage("Invalid therapy ID"),

  body("therapies.*.durationDays")
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Invalid therapy duration"),

  body("therapies.*.costPerDay")
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage("Invalid cost per day")
];

module.exports = {
  createTherapyPlanValidation
};