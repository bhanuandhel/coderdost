import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Product } from "../models/Product.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({
    status: true,
    products,
  });
});

export const createProduct = catchAsyncError(async (req, res, next) => {
  const { name, price, category, rating, color, size, details, image, images } =
    req.body;
  if (!name || !price || !category || !rating) {
    return next(new ErrorHandler("Please enter all field", 400));
  }
  let product = await Product.create({
    name,
    price,
    category,
    rating,
    color,
    size,
    details,
    image,
    images,
  });

  res.status(200).json({
    status: true,
    product,
    message: "Product add successfuly",
  });
});

export const getProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  res.status(200).json({
    status: true,
    product,
    message: "Product add successfuly",
  });
});

export const updateProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, category, rating, color, size, details, image, images } =
    req.body;
  if (!name || !price || !category || !rating) {
    return next(new ErrorHandler("Please enter all field", 400));
  }

  const product = await Product.findByIdAndUpdate(
    id,
    {
      name,
      price,
      category,
      rating,
      color,
      size,
      details,
      image,
      images,
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Update product Successfully",
    product,
  });
});

export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found"));

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product delete Successfully",
  });
});
