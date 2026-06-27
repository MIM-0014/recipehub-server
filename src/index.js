const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

let db;

async function startServer() {
  db = await connectDB();

  app.get("/", (req, res) => {
    res.send("🍲 RecipeHub Server Running...");
  });

  // Health Check
  app.get("/health", async (req, res) => {
    try {
      await db.command({ ping: 1 });

      res.status(200).json({
        success: true,
        message: "MongoDB Connected Successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "MongoDB Connection Failed",
      });
    }
  });

  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}

startServer();