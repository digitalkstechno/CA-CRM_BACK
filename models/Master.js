const mongoose = require('mongoose');

const masterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['relation', 'category', 'status', 'other']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure unique name per type
masterSchema.index({ name: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('Master', masterSchema);