const express = require("express");
const connectDB = require("./cofing/db");

const app = express();
connectDB();

// Build the API
app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(5000, console.log("Server is listening to port 5000..."));
