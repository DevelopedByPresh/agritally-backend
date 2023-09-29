import mongoose from "mongoose";

const catFishSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    section: {
      type: String,
      enum: ["Fingerlings", "Mature"],
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
      required: true
    },

    price: {
      type: Number,
      required: true,
    },

    weight: {
      type: String,
      default: "0 kg",
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

export default mongoose.model("CatFish", catFishSchema);
