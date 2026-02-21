const express = require("express");
const router = express.Router();//importing the controller functions for authentication

const {//importing the controller functions from controllers/authController.js
  registerUser,
  loginUser,
} = require("../controllers/authController");

router.post("/register", registerUser);//route for user registration When a POST request comes to this URL, run this function(registerUser)which is in Controllers
router.post("/login", loginUser);//same here for login

module.exports = router;
