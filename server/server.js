const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const UserModel = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json()); // Middleware to parse JSON request bodies

const PORT = 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString("hex");

// Check if MongoDB URI is defined, otherwise stop the server
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env file");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log(`✅ MongoDB Connected`))
.catch((error) => console.error("❌ MongoDB Connection Error:", error));


// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]; // Get token from request headers
  if (!token) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET); // Verify token
    req.user = decoded; // Attach decoded user info to request
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};


 // Register a new user
app.post('/register', async (req, res) => {
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
});


// Login user and generate JWT token

app.post('/login', async (req, res) => {
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

    res.status(200).send({ message: "Login Successful", email: user.email, token });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});


// Protected route that requires authentication
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});


// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on PORT ${PORT}`);
});
