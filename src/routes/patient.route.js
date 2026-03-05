const express = require("express");

const {
  createPatient,
  getPatients,
  getPatientHistory
} = require("../controllers/patient.controller.js");
const {
  createPatientValidation
} = require("../validation/patient.validation.js");
const validate = require("../middlewares/validate.js");
const {protect} = require("../middlewares/auth.js");
const router = express.Router();

router.post(
  "/",
  createPatientValidation,
  validate,
  createPatient
);
router.get("/", getPatients);
router.get(
  "/:patientId/history",
  protect,
  getPatientHistory
);

module.exports = router;