const { body } = require("express-validator");

const createPatientValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),

  body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender"),

  body("dateOfBirth")
    .isISO8601()
    .withMessage("Invalid date of birth")
    .custom((value) => {
      const dob = new Date(value);
      if (dob >= new Date()) {
        throw new Error("Date of birth must be in the past");
      }
      return true;
    }),

  body("phone")
    .isMobilePhone("en-IN")
    .withMessage("Invalid Indian phone number"),

  body("address")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Address too short")
];

module.exports = {
  createPatientValidation
};