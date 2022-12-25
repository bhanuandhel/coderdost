import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import {Order} from "./Order.js";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter user name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    address: {
      type: [Object],
      default: [],
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

schema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", schema);
