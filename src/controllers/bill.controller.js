const billModel = require("../models/bill.model.js");
const asyncHandler = require("../utils/asyncHandler.js");
const AppError = require("../utils/AppError.js");

const getBillByPlan = asyncHandler(async (req, res) => {

  const bill = await billModel
    .findOne({ therapyPlan: req.params.planId })
    .populate("patient", "fullName phone");

  if (!bill) {
    throw new AppError("Bill not found", 404);
  }

  res.status(200).json({
    success: true,
    data: bill
  });

});


const addPayment = asyncHandler(async (req, res) => {

  const { amount } = req.body;

  const bill = await billModel.findById(req.params.billId);

  if (!bill) {
    throw new AppError("Bill not found", 404);
  }

  bill.paidAmount += amount;

  if (bill.paidAmount >= bill.totalAmount) {
    bill.status = "paid";
    bill.paidAmount = bill.totalAmount;
  } else {
    bill.status = "partial";
  }

  await bill.save();

  res.status(200).json({
    success: true,
    data: bill
  });

});

module.exports = {
  getBillByPlan,
  addPayment,
};