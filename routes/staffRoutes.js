const express = require('express');
const router = express.Router();
const {
  loginStaff,
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
} = require('../controllers/staffController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/staff/login', loginStaff);

// Protected routes
router.get('/staff', protect, getAllStaff);
router.get('/staff/:id', protect, getStaffById);
router.post('/staff', protect, createStaff);
router.put('/staff/:id', protect, updateStaff);
router.delete('/staff/:id', protect, deleteStaff);

module.exports = router;