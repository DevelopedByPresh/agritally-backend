import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
    },
    date_of_birth: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "staff",
    },
  },
  {
    timestamps: true,
  }
);
export const User = model("User", userSchema);
