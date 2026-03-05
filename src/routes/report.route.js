const express = require("express");

const {
  getRevenueReport,
  getTopTherapies,
  getPatientStats
} = require("../controllers/reports.controller.js");

const {protect} = require("../middlewares/auth.js");
const authorize = require("../middlewares/authorize.js");

const router = express.Router();

router.get(
  "/revenue",
  protect,
  authorize("admin"),
  getRevenueReport
);

router.get(
  "/top-therapies",
  protect,
  authorize("admin"),
  getTopTherapies
);

router.get(
  "/patient-count",
  protect,
  authorize("admin"),
  getPatientStats
);

module.exports = router;