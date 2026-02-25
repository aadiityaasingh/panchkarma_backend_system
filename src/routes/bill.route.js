const express = require("express");
const {getBillByPlan, addPayment} = require("../controllers/bill.controller.js");

const {protect} = require("../middlewares/auth.js");
const authorize = require("../middlewares/authorize.js");

const router = express.Router();

router.get(
  "/plan/:planId",
  protect,
  authorize("admin"),
  getBillByPlan
);

router.patch(
  "/:billId/pay",
  protect,
  authorize("admin"),
  addPayment
);

module.exports = router;