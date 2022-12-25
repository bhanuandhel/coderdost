import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Product } from "../models/Product.js";

export const getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({
    status: true,
    products,
  });
});
