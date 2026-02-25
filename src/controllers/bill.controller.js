const billModel = require("../models/bill.model.js");

const getBillByPlan = async (req,res) => {
    try {
    const bill = await billModel.findOne({
      therapyPlan: req.params.planId
    }).populate("patient", "fullName phone");

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found"
      });
    }

    res.status(200).json({
      success: true,
      data: bill
    });
  } catch (error) {
    console.error("GET BILL ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bill"
    });
  }
};

const addPayment = async(req,res) => {
    try {
    const { amount } = req.body;

    const bill = await billModel.findById(req.params.billId);
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found"
      });
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
  } catch (error) {
    console.error("ADD PAYMENT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add payment"
    });
  }
};

module.exports = {
    getBillByPlan,
    addPayment,
}