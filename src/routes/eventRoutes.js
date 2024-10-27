const express = require("express");
const router = express.Router();
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Admin: creating event
router.post("/", protect, adminOnly, createEvent)

// Admin: updating event
router.put("/:id", protect, adminOnly, updateEvent)

// Public: getting all events
router.get("/", getEvents)

// Admin: deleting event
router.delete("/:id", protect, adminOnly, deleteEvent)


module.exports = router;
