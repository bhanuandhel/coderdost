import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    items: [Object],
    shipping_charges: {
      type: Number,
      required: false,
    },
    discount_in_percent: {
      type: Number,
      required: false,
    },
    shipping_address: {
      type: Object,
    },
    total_items: {
      type: Number,
      required: true,
    },
    total_cost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", schema);
