const mongoose = require('mongoose');

const eggSchema = new mongoose.Schema({
  size: {
    type: String,
    enum: ["Big", "Small"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
}, 
{
  timestamps: true,
});

module.exports = mongoose.model('Egg', eggSchema);
