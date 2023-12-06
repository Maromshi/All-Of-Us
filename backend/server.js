const express = require("express");
const connectDB = require("./cofing/db");

const app = express();

const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

// To accept the data from HTTP request
app.use(express.json());
// connectiong to DB
connectDB();
// For loading environment variables from a file .env
dotenv.config();

// Build the API
app.get("/", (req, res) => {
  res.send("API is running");
});

// API - Routing
app.use("/api/user", userRoutes);

app.listen(5000, console.log("Server is listening to port 5000..."));
