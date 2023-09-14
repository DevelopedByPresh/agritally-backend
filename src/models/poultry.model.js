const mongoose = require('mongoose');

const poultrySchema = new mongoose.Schema({
  section: {
    type: String,
    enum: ["Layers", "Broilers"],
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
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

module.exports = mongoose.model('Poultry', poultrySchema);
