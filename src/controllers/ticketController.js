const Ticket = require("../models/Ticket");
const {
  orderTicketValidation,
} = require("../utils/validations/ticketValidation");

exports.orderTicket = async (req, res) => {
  const { error } = orderTicketValidation(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const { eventId, quantity, totalPrice } = req.body;
    const userId = req.user._id


    const ticket = new Ticket({
      userId,
      eventId,
      quantity,
      totalPrice, 
      status: "pending", // Default status is 'pending'
    });

    const createdTicket = await ticket.save();
    res.status(201).json(createdTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserTickets = async (req, res) => {
  try {
    const userId = req.user._id
    const tickets = await Ticket.find({ userId}).populate("eventId", "title");;
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({})
      .populate("userId", "name email")
      .populate("eventId", "title");
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticketId = req.params.id

    const ticket = await Ticket.findById(ticketId)
      .populate("userId", "name email")
      .populate("eventId", "title");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTicketStatus = async (req, res) => {
  try {
    const ticketId = req.params.id
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = req.body.status || ticket.status;

    const updatedTicket = await ticket.save();
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.id
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    await ticket.deleteOne();
    res.status(200).json({ message: "Ticket deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
