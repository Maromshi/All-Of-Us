const express = require("express");
const connectDB = require("./cofing/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

const dotenv = require("dotenv");

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
// handeling all Users calls
app.use("/api/user", userRoutes);
// handeling all Chat calls - Remove , Add, Rename, etc..
app.use("/api/chat", chatRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(5000, console.log("Server is listening to port 5000..."));
