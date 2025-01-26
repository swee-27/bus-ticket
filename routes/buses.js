const express = require("express");
const { addBus, getBuses, deleteBus } = require("../controllers/busController");

const router = express.Router();

router.post("/", addBus); // Admin-only
router.get("/", getBuses); // Public
router.delete("/:id", deleteBus); // Admin-only

module.exports = router;
