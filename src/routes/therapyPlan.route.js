const express = require("express");

const {
  createTherapyPlan,
  getTherapyPlans
} = require("../controllers/therapyPlan.controller.js");

const {
  createTherapyPlanValidation
} = require("../validation/therapyPlan.validation.js");

const validate = require("../middlewares/validate.js");

const router = express.Router();

router.post(
  "/",
  createTherapyPlanValidation,
  validate,
  createTherapyPlan
);

router.get("/", getTherapyPlans);

module.exports = router;