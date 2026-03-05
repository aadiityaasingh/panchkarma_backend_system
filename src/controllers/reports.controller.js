const billModel = require("../models/bill.model.js");
const therapyPlanModel = require("../models/therapyPlan.model.js");
const patientModel = require("../models/patient.model.js");

const getRevenueReport = async (req, res) => {
  try {
    const revenue = await billModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalPaid: { $sum: "$paidAmount" }
        }
      }
    ]);

    const result = revenue[0] || {
      totalRevenue: 0,
      totalPaid: 0
    };

    const totalUnpaid = result.totalRevenue - result.totalPaid;

    return res.status(200).json({
      success: true,
      data: {
        totalRevenue: result.totalRevenue,
        totalPaid: result.totalPaid,
        totalUnpaid
      }
    });

  } catch (error) {
    console.error("REVENUE REPORT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate revenue report"
    });
  }
};

const getTopTherapies = async (req, res) => {
  try {

    const therapies = await therapyPlanModel.aggregate([
      { $unwind: "$therapies" },

      {
        $group: {
          _id: "$therapies.therapy",
          count: { $sum: 1 }
        }
      },

      { $sort: { count: -1 } },

      { $limit: 5 }
    ]);

    return res.status(200).json({
      success: true,
      data: therapies
    });

  } catch (error) {
    console.error("THERAPY REPORT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch therapy usage"
    });
  }
};

const getPatientStats = async (req, res) => {
  try {

    const totalPatients = await patientModel.countDocuments();

    return res.status(200).json({
      success: true,
      data: {
        totalPatients
      }
    });

  } catch (error) {

    console.error("PATIENT STATS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch patient stats"
    });

  }
};

module.exports = {
  getRevenueReport,
  getTopTherapies,
  getPatientStats
};