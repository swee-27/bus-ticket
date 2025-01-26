const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  seats: { type: Number, required: true },
  fare: { type: Number, required: true },
  bookedSeats: { type: [Number], default: [] },
});

module.exports = mongoose.model("Bus", busSchema);
