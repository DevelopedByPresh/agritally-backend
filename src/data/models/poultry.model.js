import { Schema, model } from "mongoose";

const poultrySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
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
    },

    quantity: {
      type: Number,
      required: true,
    },

    mortality: {
        type: Number,
        required: true,
      },
    
      openingBalance: {
        type: Number,
        default: 0,
      },
  
      closingBalance: {
        type: Number,
        default: 0,
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
