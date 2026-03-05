const patientModel = require("../models/patient.model.js");
const therapyPlanModel = require("../models/therapyPlan.model.js");
const sessionModel = require("../models/session.model.js");
const billModel = require("../models/bill.model.js");

async function createPatient(req, res) {
  try {
    const patient = await patientModel.create(req.body);
    res.status(201).json({
      message: "created",
      success: true,
      data: patient,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Patient with this phone already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create patient",
    });
  }
}

async function getPatients(req, res) {
  try {
    const patients = await patientModel.find({ isActive: true }).sort({
      created: -1,
    });
    res.status(200).json({
      success: true,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch patients",
    });
  }
}

async function getPatientHistory(req, res){
  try {
    const { patientId } = req.params;

    const plans = await therapyPlanModel.find({ patient: patientId })
      .populate("therapies.therapy", "name category")
      .sort({ startDate: -1 });

    const planIds = plans.map(p => p._id);

    const sessions = await sessionModel.find({
      therapyPlan: { $in: planIds }
    }).populate("therapy", "name");

    const bills = await billModel.find({
      therapyPlan: { $in: planIds }
    });

    res.status(200).json({
      success: true,
      data: {
        plans,
        sessions,
        bills
      }
    });
  } catch (error) {
    console.error("PATIENT HISTORY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch patient history"
    });
  }
}

module.exports = {
  createPatient,
  getPatients,
  getPatientHistory
};
