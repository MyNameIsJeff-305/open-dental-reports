const express = require("express");
const router = express.Router();
const db = require("../../db"); // Import the database connection
const moment = require('moment');

// Get all Procedures performed within a specific date range (startDate and endDate)
router.get("/", async (req, res) => {
    const { startDate, endDate } = req.query;

    // Start building the query
    let query = `
        SELECT 
            p.ProcDate AS procedure_date,
            c.Descript AS procedure_name,
            c.ProcCode AS procedure_code,
            pat.FName AS first_name,
            pat.LName AS last_name
        FROM procedurelog p
        JOIN procedurecode c ON p.CodeNum = c.CodeNum
        JOIN patient pat ON p.PatNum = pat.PatNum
        WHERE p.ProcStatus IN (2, 3, 4)`;

    const queryParams = [];

    // Add conditions for startDate and endDate
    if (startDate) {
        query += " AND p.ProcDate >= ?";
        queryParams.push(startDate); // Ensure `startDate` is in a valid format (YYYY-MM-DD or YYYY-MM-DD HH:MM:SS)
    }

    if (endDate) {
        query += " AND p.ProcDate <= ?";
        queryParams.push(endDate); // Ensure `endDate` is in a valid format (YYYY-MM-DD or YYYY-MM-DD HH:MM:SS)
    }

    query += " ORDER BY p.ProcDate DESC"; // Optional: you can adjust the order

    try {
        const [results] = await db.execute(query, queryParams);
        res.json(results);
    } catch (error) {
        console.error("Error fetching treatments:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get all Procedures performed in the last 7 days
router.get("/lastweek", async (req, res) => {
    const query = `
        SELECT 
            p.ProcDate AS procedure_date,
            c.Descript AS procedure_name,
            c.ProcCode AS procedure_code,
            pat.FName AS first_name,
            pat.LName AS last_name
        FROM procedurelog p
        JOIN procedurecode c ON p.CodeNum = c.CodeNum
        JOIN patient pat ON p.PatNum = pat.PatNum
        WHERE p.ProcDate > DATE_SUB(NOW(), INTERVAL 7 DAY)
        AND p.ProcStatus IN (2, 3, 4)
        ORDER BY p.ProcDate DESC`;

    try {
        const [procedures] = await db.execute(query);
        res.json(procedures);
    } catch (error) {
        console.error("Error fetching procedures:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get all Procedures performed in the last 30 days
router.get("/lastmonth", async (req, res) => {
    const query = `
        SELECT 
            p.ProcDate AS procedure_date,
            c.Descript AS procedure_name,
            c.ProcCode AS procedure_code,
            pat.FName AS first_name,
            pat.LName AS last_name
        FROM procedurelog p
        JOIN procedurecode c ON p.CodeNum = c.CodeNum
        JOIN patient pat ON p.PatNum = pat.PatNum
        WHERE p.ProcDate > DATE_SUB(NOW(), INTERVAL 30 DAY)
        AND p.ProcStatus IN (2, 3, 4)
        ORDER BY p.ProcDate DESC`;

    try {
        const [procedures] = await db.execute(query);
        res.json(procedures);
    } catch (error) {
        console.error("Error fetching procedures:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get all Procedures performed in the last 365 days
router.get("/lastyear", async (req, res) => {
    const query = `
        SELECT 
            p.ProcDate AS procedure_date,
            c.Descript AS procedure_name,
            c.ProcCode AS procedure_code,
            pat.FName AS first_name,
            pat.LName AS last_name
        FROM procedurelog p
        JOIN procedurecode c ON p.CodeNum = c.CodeNum
        JOIN patient pat ON p.PatNum = pat.PatNum
        WHERE p.ProcDate > DATE_SUB(NOW(), INTERVAL 365 DAY)
        AND p.ProcStatus IN (2, 3, 4)
        ORDER BY p.ProcDate DESC`;

    try {
        const [procedures] = await db.execute(query);
        res.json(procedures);
    } catch (error) {
        console.error("Error fetching procedures:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Get all Procedures performed within a date range
router.get("/dateRange", async (req, res) => {
    const { startDate, endDate } = req.query;

    // Start building the query
    let query = `
        SELECT 
            p.DateEntryC AS procedure_date,
            
            c.Descript AS procedure_name,
            c.ProcCode AS procedure_code,
            pat.FName AS first_name,
            pat.LName AS last_name
        FROM procedurelog p
        JOIN procedurecode c ON p.CodeNum = c.CodeNum
        JOIN patient pat ON p.PatNum = pat.PatNum`;

    const queryParams = [];

    
    try {
        const [results] = await db.execute(query, queryParams);
        
        // Filter results based on startDate and endDate after fetching them
        let filteredResults = results;

        if (startDate) {
            filteredResults = filteredResults.filter(result => moment(result.procedure_date).isSameOrAfter(moment(startDate)));
        }

        if (endDate) {
            filteredResults = filteredResults.filter(result => moment(result.procedure_date).isSameOrBefore(moment(endDate)));
        }

        res.json(filteredResults);
    } catch (error) {
        console.error("Error fetching treatments:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
