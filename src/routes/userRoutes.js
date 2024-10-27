const express = require('express')

const {getUsers, getUserById, updateUser, deleteUser} = require("../controllers/userController")
const {protect, adminOnly} = require("../middleware/authMiddleware")

const router = express.Router()

// Admin: Get all users
router.get('/', protect, adminOnly, getUsers);

// Admin: Get user by ID
router.get('/:id', protect, adminOnly, getUserById);

// Admin: Update user
router.put('/:id', protect, adminOnly, updateUser);

// Admin: Delete user
router.delete('/:id', protect, adminOnly, deleteUser);


module.exports = router