const mongoose = require('mongoose');

const catFishSchema = new mongoose.Schema({
  size: {
    type: String,
    enum: ["Fingerings", "Mature"],
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
  },
  weight: {
    type: String,
    default: "0 kg",
  },
}, 
{
  timestamps: true,
});

module.exports = mongoose.model('CatFish', catFishSchema);
