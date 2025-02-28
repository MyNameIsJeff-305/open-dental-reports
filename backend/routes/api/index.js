const router = require("express").Router();
const dashboardRoutes = require("./dashboardRoutes");
const patientRoutes = require("./patientRoutes");
const apptRoutes = require("./apptRoutes");
const proceduresRoutes = require("./proceduresRoutes");

router.use("/dashboard", dashboardRoutes);
router.use("/patients", patientRoutes);
router.use("/appointments", apptRoutes);
router.use("/procedures", proceduresRoutes);

module.exports = router;