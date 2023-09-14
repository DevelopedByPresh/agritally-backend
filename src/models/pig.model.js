const mongoose = require('mongoose');

const pigSchema = new mongoose.Schema({
  section: {
    type: String,
    enum: ["Boar", "Dry Sows", "In-pigs", "Growers", "Weaners", "Piglets"],
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  quantity: {
    type: Number,
    default: 1,
  },
  weight: {
    type: String,
    default: "0 kg",
  },
}, 
{
  timestamps: true,
});

module.exports = mongoose.model('Pig', pigSchema);
