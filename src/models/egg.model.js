const mongoose = require("mongoose");

const eggSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    size: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Egg", eggSchema);
