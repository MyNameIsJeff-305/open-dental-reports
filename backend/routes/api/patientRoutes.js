require("dotenv").config();
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
    const query = `SELECT * FROM patient WHERE DateFirstVisit BETWEEN ? AND ? ORDER BY SecDateEntry ASC`;

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
    const query =
        `SELECT 
        p.ProcDate, 
        p.ProcNum,
        p.PatNum,
        p.ProcStatus,
        c.Descript AS procedure_name,
        c.ProcCode AS procedure_code
    FROM 
        procedurelog p 
    JOIN 
        procedurecode c ON p.CodeNum = c.CodeNum
    WHERE 
        p.PatNum = ? 
    ORDER BY 
        p.ProcDate DESC`;

    try {
        const [procedures] = await db.execute(query, [id]);
        res.json(procedures);
    } catch (error) {
        console.error("Error fetching procedures:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Get all Patients that attend on a Date Range
router.get("/attended", async (req, res, next) => {
    const { startDate, endDate } = {startDate: '2020-01-01', endDate: '2028-01-01'};
    console.log("HEEEEEEEEEEEEE HEEEEEEEEEEEEEEEE", startDate, endDate);

    const query = `SELECT
    pat.PatNum   AS patient_number,
    pat.FName    AS first_name,
    pat.LName    AS last_name,
    pat.Gender   AS gender,
    MIN(p.ProcDate) AS first_visit_date,  -- optional: when they first came in during this window
    MAX(p.ProcDate) AS last_visit_date    -- optional: when they last came in during this window
FROM procedurelog p
INNER JOIN patient pat 
    ON p.PatNum = pat.PatNum
WHERE p.ProcDate BETWEEN ? AND ?
GROUP BY
    pat.PatNum,
    pat.FName,
    pat.LName,
    pat.Gender
ORDER BY
    last_visit_date DESC;`

    //Validate date format
    if (!Date.parse(startDate) || !Date.parse(endDate)) {
        return res.status(400).json({ error: "Invalid date format" });
    }


    try {
        const [patients] = await db.execute(query, [moment(startDate).utc().set('hour', 5).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString(), moment(endDate).utc().set('hour', 5).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString()]);
        res.json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error.message); // Log more info for debugging
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;