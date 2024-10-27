const express = require('express');
const { getSliders, createSlider, updateSlider, deleteSlider } = require('../controllers/sliderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();


// Public route
router.get('/', getSliders);

// Admin route
router.post('/', protect, adminOnly, createSlider); 

// Admin route
router.put('/:id', protect, adminOnly, updateSlider); 

// Admin route
router.delete('/:id', protect, adminOnly, deleteSlider);

module.exports = router;
