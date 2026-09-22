import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";


// Load environment variables
dotenv.config();


// Create Express application
const app = express();


// Connect MongoDB
connectDB();


// Middleware

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MERN CRUD API is running.",
  });
});


// User routes

app.use("/api/users", userRoutes);


// Handle unknown API routes

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});


// Server port

const PORT = process.env.PORT || 5000;


// Start server

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});