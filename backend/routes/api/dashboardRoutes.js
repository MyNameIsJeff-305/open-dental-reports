const express = require("express");
const router = express.Router();
const db = require("../../db"); // Import the database connection

//Get all Patients from patient table
router.get("/", async (req, res) => {
    const { startDate, endDate } = req.query;

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
        WHERE p.ProcStatus IN (2, 3, 4)
    `;

    const queryParams = [];
    if (startDate) {
        query += " AND p.ProcDate >= ?";
        queryParams.push(startDate);
    }
    if (endDate) {
        query += " AND p.ProcDate <= ?";
        queryParams.push(endDate);
    }

    query += " ORDER BY p.ProcDate DESC";

    try {
        const [results] = await db.execute(query, queryParams);
        res.json(results);
    } catch (error) {
        console.error("Error fetching treatments:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;