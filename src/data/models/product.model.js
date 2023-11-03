import { Schema, model } from "mongoose";
import autopopulate from "mongoose-autopopulate"; 

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      autopopulate: {
        select: "firstName lastName",
      }
    },
    category: {
      type: String,
      enum: ["Cat-fish", "Egg", "Pig", "Poultry"],
      required: true,
    },
    section: {
      type: String,
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

// Add pre-save middleware to validate the 'section' field based on the 'category' field
productSchema.pre("save", function (next) {
  const allowedSections = {
    "Cat-fish": ["Fingerlings", "Mature"],
    Egg: ["Big", "Small"],
    Pig: ["Boar", "Dry Sows", "In-pigs", "Growers", "Weaners", "Piglets"],
    Poultry: ["Broilers", "Layers"],
  };

  const selectedCategory = this.category;
  const selectedSection = this.section;

  if (!allowedSections[selectedCategory].includes(selectedSection)) {
    const error = new Error("Invalid section for the selected category");
    return next(error);
  }

  next();
});

productSchema.plugin(autopopulate);

export const Product = model("Product", productSchema);
