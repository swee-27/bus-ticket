const Bus = require("../models/Bus");

exports.addBus = async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.status(201).json(bus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBuses = async (req, res) => {
  try {
    const { source, destination, date } = req.query;
    const buses = await Bus.find({ source, destination, date });
    res.status(200).json(buses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBus = async (req, res) => {
  try {
    const { id } = req.params;
    await Bus.findByIdAndDelete(id);
    res.status(200).json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
