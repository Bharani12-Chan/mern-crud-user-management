import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// ----------------------------------------------------
// Path setup
// ----------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------------------------------------------
// Connect MongoDB
// ----------------------------------------------------

connectDB();

// ----------------------------------------------------
// Middleware
// ----------------------------------------------------

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// CORS is mainly needed during local development
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// ----------------------------------------------------
// API Health Check
// ----------------------------------------------------

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MERN CRUD API is running.",
  });
});

// ----------------------------------------------------
// API Routes
// ----------------------------------------------------

app.use("/api/users", userRoutes);

// Unknown API route
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

// ----------------------------------------------------
// Production React Frontend
// ----------------------------------------------------

if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.join(
    __dirname,
    "../client/dist"
  );

  app.use(express.static(clientDistPath));

  // React Router fallback
  app.get(/.*/, (req, res) => {
    res.sendFile(
      path.join(clientDistPath, "index.html")
    );
  });
}

// ----------------------------------------------------
// Server
// ----------------------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server running on 0.0.0.0:${PORT}`
  );
});