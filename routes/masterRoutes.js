const express = require('express');
const router = express.Router();
const masterController = require('../controllers/masterController');

// GET /api/masters - Get all masters (with optional type filter)
router.get('/', masterController.getAllMasters);

// GET /api/masters/:id - Get master by ID
router.get('/:id', masterController.getMasterById);

// POST /api/masters - Create new master
router.post('/', masterController.createMaster);

// PUT /api/masters/:id - Update master
router.put('/:id', masterController.updateMaster);

// DELETE /api/masters/:id - Soft delete master
router.delete('/:id', masterController.deleteMaster);

// DELETE /api/masters/:id/hard - Hard delete master
router.delete('/:id/hard', masterController.hardDeleteMaster);

module.exports = router;