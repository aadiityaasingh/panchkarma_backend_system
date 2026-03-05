const express = require("express");

const {
  createPatient,
  getPatients,
  getPatientHistory
} = require("../controllers/patient.controller.js");

const {
  createPatientValidation
} = require("../validation/patient.validation.js");

const validate = require("../middlewares/validate.js");
const { protect } = require("../middlewares/auth.js");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient management APIs
 */

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               age:
 *                 type: number
 *               gender:
 *                 type: string
 *     responses:
 *       201:
 *         description: Patient created successfully
 */
router.post(
  "/",
  createPatientValidation,
  validate,
  createPatient
);

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of patients
 */
router.get("/", getPatients);

/**
 * @swagger
 * /api/patients/{patientId}/history:
 *   get:
 *     summary: Get patient treatment history
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient history fetched
 */
router.get(
  "/:patientId/history",
  protect,
  getPatientHistory
);

module.exports = router;