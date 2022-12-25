import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, , "Please enter product name"],
    },
    category: {
      type: String,
      required: [true, , "Please enter category name"],
    },
    price: {
      type: Number,
      required: [true, , "Please enter price"],
    },
    rating: {
      type: Number,
      required: [true, , "Please enter rating"],
    },
    color: "red" | "green" | "black",
    size: "S" | "M" | "L",
    details: Object,
    image: { type: String, required: true },
    images: { type: [String], required: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", schema);
