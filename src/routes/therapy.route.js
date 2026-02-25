const express = require("express");

const {
  createTherapy,
  getTherapies
} = require("../controllers/therapy.controller.js");

const {
  createTherapyValidation
} = require("../validation/therapy.validation.js");

const validate = require("../middlewares/validate.js");
const {protect} = require("../middlewares/auth.js");
const authorize = require("../middlewares/authorize.js");

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("admin"),
  createTherapyValidation,
  validate,
  createTherapy
);

router.get("/", getTherapies);

module.exports = router;