const Event = require("../models/Event");
const { createEventValidation, updateEventValidation } = require("../utils/validations/eventValidation");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("categories");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEvent = async (req, res) => {
  const { error } = createEventValidation(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const { title, description, date, categories, location, price } = req.body;

  try {
    const event = new Event({
      title,
      description,
      date,
      categories,
      location,
      price,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  const { error } = updateEventValidation(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const { id } = req.params;

  const {
    title,
    description,
    date,
    categories,
    location,
    price,
  } = req.body

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;
    if (categories) event.categories = categories;
    if (location) event.location = location;
    if (price !== undefined) event.price = price;

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
