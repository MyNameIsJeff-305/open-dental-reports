const express = require("express");
const router = express.Router();
const db = require("../../db"); // Import the database connection

//Get All Appointments
router.get("/", async (req, res) => {
    const query = 'SELECT * FROM appointment'; // Adjust the query based on your schema
    try {
        const [appointments] = await db.execute(query);
        res.json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;