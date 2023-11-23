import { Schema, model } from "mongoose";

const eggSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["Big", "Small"],
      requiredd: true,
    },
    penNumber: {
      type: Number,
      required: true,
    },
    totalBirdHoused: {
      type: Number,
    },
    ageHoused: {
      type: Number,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    openingBalance: {
      type: Number,
    },
    mortality: {
      type: Number,
      default: 0,
    },
    culls: {
      type: Number,
    },
    closingBalance: {
      type: Number,
    },
    waterConsumption: {
      type: Number,
      required: true,
    },
    feedConsumption: {
      type: Number,
      required: true,
    },
    eggCollection: {
      firstTray: {
        type: Number,
        required: true,
      },
      secondTray: {
        type: Number,
        required: true,
      },
      thirdTray: {
        type: Number,
        required: true,
      },
      cracks: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
      },
      production: {
        type: Number,
      },
    },
    remark: {
      type: String,
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

export const Egg = model("Egg", eggSchema);
