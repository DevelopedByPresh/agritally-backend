import { Schema, model } from "mongoose";

const eggSchema = new Schema(
  {
    breed: {
      type: String,
      require: true,
    },
    penNumber: {
      type: Number,
      require: true,
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
      require: true,
    },
    feedConsumption: {
      type: Number,
      require: true,
    },
    eggCollection: {
      firstTray: {
        type: Number,
        require: true,
      },
      secondTray: {
        type: Number,
        require: true,
      },
      thirdTray: {
        type: Number,
        require: true,
      },
      cracks: {
        type: Number,
        require: true,
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
  },
  {
    timestamps: true,
  }
);

export const Egg = model("Egg", eggSchema);
