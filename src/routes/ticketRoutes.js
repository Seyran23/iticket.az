const express = require("express")
const {orderTicket, getUserTickets, getTickets,  getTicketById, updateTicketStatus, deleteTicket} = require("../controllers/ticketController")
const {protect, adminOnly} = require("../middleware/authMiddleware")

const router = express.Router()

// Public/User: Order a ticket
router.post('/order', protect, orderTicket);

// Public/user's tickets
router.get('/user', protect, getUserTickets);

// Admin: View all tickets
router.get('/', protect, adminOnly, getTickets);

// Admin: View ticket by ID
router.get('/:id', protect, adminOnly, getTicketById);

// Admin: Accept/Reject a ticket
router.put('/:id', protect, adminOnly, updateTicketStatus);

// Admin: Delete a ticket
router.delete('/:id', protect, adminOnly, deleteTicket);

module.exports = router