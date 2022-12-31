import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    items: [Object],
    shipping_charges: {
      type: Number,
      required: [true, "Please Shipping Charges"],
    },
    discount_in_percent: {
      type: Number,
      required: [true, "Please Discount in Percent"],
    },
    shipping_address: {
      type: Object,
    },
    total_items: {
      type: Number,
      required: [true, "Please total items"],
    },
    total_cost: {
      type: Number,
      required: [true, "Please total cost"],
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", schema);
