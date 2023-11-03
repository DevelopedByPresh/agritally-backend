import { Schema, model } from "mongoose";

const eggSchema = new Schema(
  {
    Breed: {
      type: String,
      require: true,
    },
    penNumber: {
      type: Number,
      require: true,
    },
    totalBirdHoused: {
      type: Number,
      require: true,
    },
    ageHoused: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    openingBalance: {
      type: Number,
      require: true,
    },
    mortality: {
      type: Number,
      default: 0,
    },
    culls: {
      type: Number,
      require: true,
    },
    closingBalance: {
      type: Number,
      require: true,
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
        require: true,
      },
      production: {
        type: Number,
        require: true,
      },
    },
    remark: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Egg = model("Egg", eggSchema);
