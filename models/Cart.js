import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    items: {
      type: [Object],
      required: [true, "at least one item is required"],
      default: [],
    },
    userId: {
      type: String,
      required: [true, "userId is required"],
    },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", schema);
