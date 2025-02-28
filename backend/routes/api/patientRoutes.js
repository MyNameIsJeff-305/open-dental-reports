const express = require("express");
const router = express.Router();
const db = require("../../db"); // Import the database connection
const moment = require('moment');

//Get all Patients from patient table
router.get("/", async (req, res) => {
    const query = 'SELECT * FROM patient'; // Adjust the query based on your schema
    try {
        const [patients] = await db.execute(query);
        res.json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Get all Patients from last 7 days
router.get("/lastweek", async (req, res) => {
    const query = 'SELECT * FROM patient WHERE SecDateEntry > DATE_SUB(NOW(), INTERVAL 7 DAY) ORDER BY SecDateEntry ASC'; // Adjust the query based on your schema
    try {
        const [patients] = await db.execute(query);
        res.json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Get all Patients from last 30 days
router.get("/lastmonth", async (req, res) => {
    const query = 'SELECT * FROM patient WHERE SecDateEntry > DATE_SUB(NOW(), INTERVAL 30 DAY) ORDER BY SecDateEntry ASC'; // Adjust the query based on your schema
    try {
        const [patients] = await db.execute(query);
        res.json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Get all Patients from last 365 days
router.get("/lastyear", async (req, res) => {
    const query = 'SELECT * FROM patient WHERE SecDateEntry > DATE_SUB(NOW(), INTERVAL 365 DAY) ORDER BY SecDateEntry ASC'; // Adjust the query based on your schema
    try {
        const [patients] = await db.execute(query);
        res.json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Get all Patients in a date range
router.get("/dateRange", async (req, res) => {
    const { startDate, endDate } = req.query;

    // Validate date format
    if (!Date.parse(startDate) || !Date.parse(endDate)) {
        return res.status(400).json({ error: "Invalid date format" });
    }

    // SQL query with parameterized inputs to prevent SQL injection
    const query = `SELECT * FROM patient WHERE DateTStamp BETWEEN ? AND ? ORDER BY SecDateEntry ASC`;

    try {
        const [patients] = await db.execute(query, [moment(startDate).utc().set('hour', 5).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString(), moment(endDate).utc().set('hour', 5).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString()]);
        res.json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error.message); // Log more info for debugging
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Get a Patient by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM patient WHERE PatNum = ?'; // Adjust the query based on your schema
    try {
        const [patient] = await db.execute(query, [id]);
        res.json(patient[0]);
    } catch (error) {
        console.error("Error fetching patient:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Get all Procedures for a patient by ID
router.get("/:id/procedures", async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM procedure WHERE PatNum = ?'; // Adjust the query based on your schema
    try {
        const [procedures] = await db.execute(query, [id]);
        res.json(procedures);
    } catch (error) {
        console.error("Error fetching procedures:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;