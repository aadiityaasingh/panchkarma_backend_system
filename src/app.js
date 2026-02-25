const express = require("express");
const app = express();
const patientRoutes = require("./routes/patient.route.js");
const therapyRoutes = require("./routes/therapy.route.js");
const therapyPlanRoutes = require("./routes/therapyPlan.route.js");
const sessionRoutes = require("./routes/session.route.js");
const userRoutes = require("./routes/user.route.js");
const authRoutes = require("./routes/auth.route.js");
const billRoutes = require("./routes/bill.route.js");

app.use(express.json());

app.get("/", (req,res) => {
    res.send("this is working app");
})

app.use("/api/patients", patientRoutes);
app.use("/api/therapies", therapyRoutes);
app.use("/api/therapy-plans", therapyPlanRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bills", billRoutes);

module.exports = app;