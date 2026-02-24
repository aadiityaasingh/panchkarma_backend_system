const express = require("express");

const {
  getSessionsPlan, updateSessionStatus
} = require("../controllers/session.controller.js");

const router = express.Router();

router.get("/plan/:planId", getSessionsPlan);
router.patch(
  "/:sessionId/status",
  updateSessionStatus
);

module.exports = router;