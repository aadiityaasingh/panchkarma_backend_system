const sessionModel = require("../models/session.model.js");
const {updatePlanStatus} = require("./therapyPlan.controller.js");

const getSessionsPlan = async(req, res) => {
    try {
    const sessions = await sessionModel.find({
      therapyPlan: req.params.planId
    }).populate("therapy", "name category");

    res.status(200).json({
      success: true,
      data: sessions
    });
  } catch (error) {
    console.error("GET SESSIONS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch sessions"
    });
  }
};

const updateSessionStatus = async (req, res) => {
    try {
    const { status, notes } = req.body;

    const allowedStatuses = ["completed", "missed", "cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid session status"
      });
    }

    const session = await sessionModel.findByIdAndUpdate(
      req.params.sessionId,
      { status, notes },
      { new: true }
    );

    await updatePlanStatus(session.therapyPlan);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found"
      });
    }

    res.status(200).json({
      success: true,
      data: session
    });
  } catch (error) {
    console.error("UPDATE SESSION ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update session"
    });
  }
}

module.exports = {
    getSessionsPlan,
    updateSessionStatus,
}