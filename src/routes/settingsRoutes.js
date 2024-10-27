const express = require('express');
const { getSettings, updateSettings } = require('../controllers/generalSettingsController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Public route
router.get('/', getSettings);                   

// Admin route
router.put('/', protect, adminOnly, updateSettings); 

module.exports = router;
