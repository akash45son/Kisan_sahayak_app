const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register Farmer
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;//take data from frontend

    if (!name || !email || !password) { //checks the missing fields
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });//searches for existing user in Mongodb
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hash password before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user if above checks are passed
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // if user is created successfully, send response with user data and token
    res.status(201).json({ //201 status code for successful User creation
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Farmer
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; //take data from frontend

    const user = await User.findOne({ email });//searches for user in Mongodb

    if (user && (await bcrypt.compare(password, user.password))) {//compares the password with hashed password in database
      res.json({ //if password matches, send response with user data and token
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
