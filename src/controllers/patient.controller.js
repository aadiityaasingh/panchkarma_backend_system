const patientModel = require("../models/patient.model.js");

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

module.exports = {
  createPatient,
  getPatients,
};
