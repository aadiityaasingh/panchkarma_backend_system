const { body } = require("express-validator");
const { diffInDays } = require("../utils/date.js");

const createTherapyPlanValidation = [
  body("patient").isMongoId(),

  body("startDate")
    .isISO8601()
    .custom((value) => {
      if (new Date(value) < new Date().setHours(0, 0, 0, 0)) {
        throw new Error("Start date cannot be in the past");
      }
      return true;
    }),

  body("endDate")
    .isISO8601()
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.startDate)) {
        throw new Error("End date cannot be before start date");
      }

      const planDays = diffInDays(req.body.startDate, value);

      const maxTherapyDays = Math.max(
        ...req.body.therapies.map((t) => t.durationDays)
      );

      if (maxTherapyDays > planDays) {
        throw new Error(
          `Therapy duration (${maxTherapyDays}) exceeds plan duration (${planDays})`
        );
      }

      return true;
    }),

  body("therapies").isArray({ min: 1 }),

  body("therapies").custom((therapies) => {
    const ids = therapies.map((t) => t.therapy);
    const uniqueIds = new Set(ids);

    if (ids.length !== uniqueIds.size) {
      throw new Error("Duplicate therapies are not allowed in a plan");
    }

    return true;
  }),

  body("therapies.*.therapy").isMongoId(),
  body("therapies.*.durationDays").isInt({ min: 1 }),
  body("therapies.*.costPerDay").isFloat({ min: 0 })
];

module.exports = {
  createTherapyPlanValidation
};