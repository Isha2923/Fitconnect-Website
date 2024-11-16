const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Assuming User model is in models/User.js
//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registration Route
router.post("/register", async (req, res) => {
  const { name, username, email, password } = req.body; // Include username here
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    //const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const newUser = new User({
      name,
      username,
      email,
      password: password, // Save hashed password
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user!", error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Compare plaintext password
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Create JWT token and set it in a cookie
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, secure: true }); // Set cookie with token
    res.json({ message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in!" });
  }
});

// Check Authentication Route
// router.get("/checkAuth", (req, res) => {
//   if (req.cookies.token) {
//     jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403); // Forbidden
//       }
//       res.sendStatus(200); // User is authenticated
//     });
//   } else {
//     res.sendStatus(401); // Unauthorized
//   }
// });

// Logout Route
// router.post("/logout", (req, res) => {
//   res.clearCookie("token"); // Clear the cookie
//   res.json({ message: "Logged out successfully!" });
// });

module.exports = router;
