const express = require("express");

const { createBooking, getUserBookings } = require("../controllers/bookingController");
const bookingController = require("../controllers/bookingController");
const router = express.Router();
router.get("/all", bookingController.getAllBookings);

router.post("/", createBooking); // User booking
router.get("/:userId", getUserBookings); // User booking history
router.get("/bookings", bookingController.getAllBookings);
module.exports = router;
