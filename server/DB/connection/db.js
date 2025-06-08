const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    // Check if MongoDB URI is defined, otherwise stop the server
    if (!MONGODB_URI) {
      console.error("MONGODB_URI is not defined in .env file");
      process.exit(1);
    }

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected`);
    
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;