require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../../db"); // Import the database connection
const moment = require('moment');

//Get all Patients that attend on a Date Range
router.get("/", async (req, res) => {
    const { startDate, endDate } = {startDate: '2025-01-01', endDate: '2025-12-31'}; // Example dates, replace with req.query

    // Validate date format
    if (!Date.parse(startDate) || !Date.parse(endDate)) {
        return res.status(400).json({ error: "Invalid date format" });
    }

    const query =   `SELECT 
                        pat.PatNum AS patient_id, 
                        pat.FName AS first_name, 
                        pat.LName AS last_name, 
                        MIN(p.ProcDate) AS first_visit, 
                        MAX(p.ProcDate) AS last_visit 
                    FROM 
                        procedurelog p 
                    JOIN 
                        patient pat ON p.PatNum = pat.PatNum 
                    WHERE 
                        p.ProcDate  
                    BETWEEN  
                        ? AND ? 
                    GROUP BY 
                        pat.PatNum, 
                        pat.FName, 
                        pat.LName 
                    ORDER BY 
                        last_visit DESC;`



    // try {
        const visits = await db.execute(query, [startDate, endDate]);
        res.json(visits);
    // } catch (error) {
        // console.error("Error fetching patients:", error.message); // Log more info for debugging
        // res.status(500).json({ error: "Internal Server Error" });
    // }
});

module.exports = router;