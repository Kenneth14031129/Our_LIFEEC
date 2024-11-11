require("dotenv").config();
require('express-async-errors');

const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors');
const app = express();
const mainRouter = require("./routes/user"); 
const patientRouter = require("./routes/patient"); 
const residentRouter = require("./routes/resident");
const dashboardRouter = require("./routes/dashboard");
const healthProgressRouter = require('./routes/healthProgress');
const activitiesRouter = require('./routes/activities'); // Add this line
const mealRouter = require("./routes/meal");

// Enable CORS to allow requests from the frontend
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Routes
app.use("/api/v1", mainRouter); 
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/resident", residentRouter);
app.use("/api/v1/health-progress", healthProgressRouter);
app.use("/api/v1/activities", activitiesRouter); // Add this line
app.use("/api/v1/meal", mealRouter); // <-- Add this line

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();