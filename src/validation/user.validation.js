const { body } = require("express-validator");

const createUserValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),

  body("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role")
    .isIn(["admin", "doctor", "therapist"])
    .withMessage("Invalid user role")
];

module.exports = {
  createUserValidation
};