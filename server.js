const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const busRoutes = require("./routes/buses");
const bookingRoutes = require("./routes/bookings");

const app = express();
app.use("/api", bookingRoutes);
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://swethaigs27:swethaig27@cluster0.dvmhr.mongodb.net/busticket')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));
  
// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
