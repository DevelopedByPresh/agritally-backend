const mongoose = require("mongoose");

const eggSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    section: {
      type: String,
      enum: ["Big", "Small"],
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

    price: {
      type: Number,
      required: true,
    },
    
    status: {
      type: String,
      enum: ["Approved", "Pending"],
      default: "Pending"
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Egg", eggSchema);
