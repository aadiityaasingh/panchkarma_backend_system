const therapyModel = require("../models/therapy.model.js");

const createTherapy = async (req, res) => {
  try {
    const therapy = await therapyModel.create(req.body);

    return res.status(201).json({
      success: true,
      data: therapy
    });
  } catch (error) {
    // Duplicate krta hai key error ko
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Therapy already exists"
      });
    }

    console.error("CREATE THERAPY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create therapy"
    });
  }
};

const getTherapies = async (req, res) => {
  try {
    const therapies = await therapyModel.find({ isActive: true }).sort({
      createdAt: -1
    });

    return res.status(200).json({
      success: true,
      data: therapies
    });
  } catch (error) {
    console.error("GET THERAPIES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch therapies"
    });
  }
};


module.exports = {
  createTherapy,
  getTherapies
};