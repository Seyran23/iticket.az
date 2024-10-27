const express = require("express")
const {getCategories, createCategory, updateCategory, deleteCategory} = require("../controllers/categoryController")

const {protect, adminOnly} = require("../middleware/authMiddleware")


const router = express.Router()

// Public: Get all categories
router.get('/', getCategories);

// Admin: Create a category
router.post('/', protect, adminOnly, createCategory);

// Admin: Update a category
router.put('/:id', protect, adminOnly, updateCategory);

// Admin: Delete a category
router.delete('/:id', protect, adminOnly, deleteCategory);

module.exports = router