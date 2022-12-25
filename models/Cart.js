import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    items: {
      type: [Object],
      required: [true, "at least one item is required"],
      default: [],
    },
    userId: { type: String, default: 1 },
  },
  { timestamps: true }
);

export const Cart = mongoose.Model("Cart", schema);
