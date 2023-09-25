const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      enum: ["Cat-fish", "Egg", "Pig", "Poultry"],
      required: true,
    },

    section: {
      type: String,
      enum: [
        "Layers",
        "Broilers",
        "Fingerlings",
        "Mature",
        "Big",
        "Small",
        "Boar",
        "Dry Sows",
        "In-pigs",
        "Growers",
        "Weaners",
        "Piglets",
      ],
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

    weight: {
      type: String,
      default: "0 kg",
    },

    price: {
      type: Number,
      default: 0,
      required: true,
    },

    status: {
      type: String,
      enum: ["Approved", "Pending"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Poultry", productSchema);
