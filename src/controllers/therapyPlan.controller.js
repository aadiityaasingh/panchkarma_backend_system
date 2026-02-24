const therapyPlanModel = require("../models/therapyPlan.model.js");
const sessionModel = require("../models/session.model.js");

const createTherapyPlan = async (req, res) => {
  try {
    const plan = await therapyPlanModel.create(req.body);

     const sessions = [];

    for (const item of plan.therapies) {
      for (let day = 0; day < item.durationDays; day++) {
        const sessionDate = new Date(plan.startDate);
        sessionDate.setDate(sessionDate.getDate() + day);

        sessions.push({
          therapyPlan: plan._id,
          therapy: item.therapy,
          sessionDate
        });
      }
    }

    await sessionModel.insertMany(sessions);

    res.status(201).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    console.error("CREATE PLAN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create therapy plan",
    });
  }
};

const getTherapyPlans = async (req,res) => {
    try {
    const plans = await therapyPlanModel.find()
      .populate("patient", "fullName phone")
      .populate("therapies.therapy", "name category");

    res.status(200).json({
      success: true,
      data: plans
    });
  } catch (error) {
    console.error("GET PLANS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch therapy plans"
    });
  }
};

const updatePlanStatus = async (planId) => {
  const sessions = await sessionModel.find({ therapyPlan: planId });

  if (sessions.length === 0) return;

  const allCompleted = sessions.every(
    s => s.status === "completed"
  );

  const anyScheduled = sessions.some(
    s => s.status === "scheduled"
  );

  let newStatus = "planned";

  if (allCompleted) newStatus = "completed";
  else if (anyScheduled) newStatus = "ongoing";

  await therapyPlanModel.findByIdAndUpdate(planId, {
    status: newStatus
  });
};

module.exports = {
    createTherapyPlan,
    getTherapyPlans,
    updatePlanStatus,
}
