import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema(
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
      enum: ["superAdmin", "owner", "manager"],
      default: "manager",
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWT_SECRET_KEY || "MyScureKey",
    { expiresIn: "15h" }
  );
  return token;
};

adminSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export const Admin = mongoose.model("Admin", adminSchema);
