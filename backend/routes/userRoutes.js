const express = require("express");
const registerUser = require("../controllers/registerUser");

const router = express.Router();

router.route("/").post(registerUser);

module.exports = router;
