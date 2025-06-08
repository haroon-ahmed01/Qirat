const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./DB/connection/db');
require('dotenv').config();
const PORT = process.env.PORT || 3001;



// Import routes
const authRoutes = require('./routes/authRoutes');

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({ 
  origin: ["http://localhost:5173"], 
  credentials: true 
}));
app.use(bodyParser.json()); // Middleware to parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
module.exports = app;