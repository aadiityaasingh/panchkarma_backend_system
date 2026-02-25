const express = require("express");

const {
  getSessionsPlan, updateSessionStatus
} = require("../controllers/session.controller.js");

const {protect} = require("../middlewares/auth.js");
const authorize = require("../middlewares/authorize.js");

const router = express.Router();

router.get("/plan/:planId", getSessionsPlan);
router.patch(
  "/:sessionId/status",
  protect,
  authorize("therapist"),
  updateSessionStatus
);

module.exports = router;