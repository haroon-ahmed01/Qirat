const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const { JWT_SECRET } = require('../middleware/authMiddleware');

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: "Email not found" });
    }

    // Compare entered password with stored hashed password
    const passwordCheck = await bcrypt.compare(req.body.password, user.password);
    if (!passwordCheck) {
      return res.status(400).send({ message: "Password does not match" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, userEmail: user.email },
      JWT_SECRET,
      { expiresIn: "24h" } // Token expires in 24 hours
    );

    res.status(200).send({ 
      message: "Login Successful", 
      email: user.email, 
      token 
    });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
};

// Protected route handler
const getProtected = (req, res) => {
  res.json({ 
    message: "This is a protected route", 
    user: req.user 
  });
};

module.exports = {
  register,
  login,
  getProtected
};
