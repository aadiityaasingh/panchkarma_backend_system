const therapyModel = require("../models/therapy.model.js");
const asyncHandler = require("../utils/asyncHandler.js");
const AppError = require("../utils/AppError.js");

const createTherapy = asyncHandler(async (req, res) => {

  try {
    const therapy = await therapyModel.create(req.body);

    res.status(201).json({
      success: true,
      data: therapy
    });

  } catch (error) {

    if (error.code === 11000) {
      throw new AppError("Therapy already exists", 400);
    }

    throw error;
  }

});

const getTherapies = asyncHandler(async (req, res) => {

  const therapies = await therapyModel
    .find({ isActive: true })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: therapies
  });

});

module.exports = {
  createTherapy,
  getTherapies
};