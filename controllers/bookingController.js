const Booking = require("../models/Booking");
const Bus = require("../models/Bus");

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { userId, busId, seats } = req.body;

    // Validate that seats are an array of numbers
    if (!Array.isArray(seats) || seats.some(seat => typeof seat !== 'number')) {
      return res.status(400).json({ error: 'Seats must be an array of numbers' });
    }

    // Find the bus by busId
    const bus = await Bus.findById(busId);

    if (!bus) return res.status(404).json({ error: "Bus not found" });

    // Check if any of the requested seats are already booked
    const alreadyBooked = seats.some((seat) => bus.bookedSeats.includes(seat));
    if (alreadyBooked) return res.status(400).json({ error: "Seats already booked" });

    // Add booked seats to the bus
    bus.bookedSeats.push(...seats);
    await bus.save();

    // Calculate total fare based on number of seats booked
    const totalFare = seats.length * bus.fare;

    // Create the booking
    const booking = await Booking.create({ user: userId, bus: busId, seats, totalFare });

    // Send the booking response
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get User Bookings
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all bookings for the user
    const bookings = await Booking.find({ user: userId })
                                  .populate("bus", "name source destination date time fare seats"); // Populate bus details

    // Return the bookings
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// In your bookingController.js
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("bus");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

