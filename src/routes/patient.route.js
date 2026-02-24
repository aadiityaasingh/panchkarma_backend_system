const express = require("express");

const {
  createPatient,
  getPatients
} = require("../controllers/patient.controller.js");

const {
  createPatientValidation
} = require("../validation/patient.validation.js");

const validate = require("../middlewares/validate.js");

const router = express.Router();

router.post(
  "/",
  createPatientValidation,
  validate,
  createPatient
);

router.get("/", getPatients);

module.exports = router;