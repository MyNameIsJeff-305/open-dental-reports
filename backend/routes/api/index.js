const router = require("express").Router();
const dashboardRoutes = require("./dashboardRoutes");
const patientRoutes = require("./patientRoutes");
const apptRoutes = require("./apptRoutes");
const proceduresRoutes = require("./proceduresRoutes");
const usersRouter = require('./users.js');
const sessionRouter = require('./session.js');

router.use("/dashboard", dashboardRoutes);
router.use("/patients", patientRoutes);
router.use("/appointments", apptRoutes);
router.use("/procedures", proceduresRoutes);
router.use("/users", usersRouter);
router.use("/session", sessionRouter);

module.exports = router;