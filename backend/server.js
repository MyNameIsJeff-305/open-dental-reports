require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const csurf = require('csurf');
const helmet = require('helmet');

const { environment } = require('./config');

const app = express();
const isProduction = environment === 'production';
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

if (!isProduction) {
  app.use(cors());
}

app.use(helmet.crossOriginResourcePolicy({
  policy: "cross-origin"
})
);

// Routes
const userRoutes = require("./routes/api/index");
app.use("/api", userRoutes);

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
