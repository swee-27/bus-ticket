const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require('bcryptjs');


// Register function
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response with user details
    res.status(201).json({ message: "User registered successfully", user: { _id: newUser._id, name, email } });
  } catch (error) {
    // Handle database errors
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email is already in use" });
    }
    res.status(500).json({ error: error.message });
  }
};

// Login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: config.jwtExpiration });

    // Return success response with the token
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
