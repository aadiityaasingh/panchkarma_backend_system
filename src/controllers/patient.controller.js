const patientModel = require("../models/patient.model.js");
const therapyPlanModel = require("../models/therapyPlan.model.js");
const sessionModel = require("../models/session.model.js");
const billModel = require("../models/bill.model.js");
const { getPagination } = require("../utils/pagination.js");

const asyncHandler = require("../utils/asyncHandler.js");
const AppError = require("../utils/AppError.js");


const createPatient = asyncHandler(async (req, res) => {

  try {
    const patient = await patientModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "created",
      data: patient
    });

  } catch (error) {

    if (error.code === 11000) {
      throw new AppError("Patient with this phone already exists", 400);
    }

    throw error;
  }

});


const getPatients = asyncHandler(async (req, res) => {

  const { page, limit, skip } = getPagination(req);
  const search = req.query.search || "";

  const filter = {
    isActive: true,
    fullName: { $regex: search, $options: "i" }
  };

  const patients = await patientModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await patientModel.countDocuments(filter);

  res.status(200).json({
    success: true,
    page,
    totalPages: Math.ceil(total / limit),
    total,
    data: patients
  });

});


const getPatientHistory = asyncHandler(async (req, res) => {

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

});


module.exports = {
  createPatient,
  getPatients,
  getPatientHistory
};