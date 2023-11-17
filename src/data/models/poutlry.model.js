import { Schema, model } from "mongoose";

const poultrySchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
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
      default: 0,
      required: true,
    },

    mortality: {
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

export const Poultry = model("Poultry", poultrySchema);
