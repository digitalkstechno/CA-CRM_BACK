const Master = require('../models/Master');

// Get all masters with optional type filter
exports.getAllMasters = async (req, res) => {
  try {
    const { type, activeOnly = 'true' } = req.query;
    const filter = {};

    if (type) {
      filter.type = type;
    }

    if (activeOnly === 'true') {
      filter.isActive = true;
    }

    const masters = await Master.find(filter).sort({ createdAt: -1 });
    res.json(masters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get master by ID
exports.getMasterById = async (req, res) => {
  try {
    const master = await Master.findById(req.params.id);
    if (!master) {
      return res.status(404).json({ message: 'Master not found' });
    }
    res.json(master);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new master
exports.createMaster = async (req, res) => {
  try {
    const { name, type } = req.body;

    // Check if master with same name and type already exists
    const existing = await Master.findOne({ name: name.trim(), type });
    if (existing) {
      return res.status(400).json({ message: 'Master with this name already exists for this type' });
    }

    const master = new Master({
      name: name.trim(),
      type
    });

    await master.save();
    res.status(201).json(master);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Master with this name already exists for this type' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Update master
exports.updateMaster = async (req, res) => {
  try {
    const { name, type, isActive } = req.body;

    // Check if another master with same name and type exists
    const existing = await Master.findOne({
      name: name.trim(),
      type,
      _id: { $ne: req.params.id }
    });
    if (existing) {
      return res.status(400).json({ message: 'Master with this name already exists for this type' });
    }

    const master = await Master.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        type,
        isActive
      },
      { new: true, runValidators: true }
    );

    if (!master) {
      return res.status(404).json({ message: 'Master not found' });
    }

    res.json(master);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Master with this name already exists for this type' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Delete master (soft delete by setting isActive to false)
exports.deleteMaster = async (req, res) => {
  try {
    const master = await Master.findById(req.params.id);
    if (!master) {
      return res.status(404).json({ message: 'Master not found' });
    }

    master.isActive = false;
    await master.save();

    res.json({ message: 'Master deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hard delete master
exports.hardDeleteMaster = async (req, res) => {
  try {
    const master = await Master.findByIdAndDelete(req.params.id);
    if (!master) {
      return res.status(404).json({ message: 'Master not found' });
    }

    res.json({ message: 'Master permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};