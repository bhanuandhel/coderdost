import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Cart } from "../models/Cart.js";

export const createCart = catchAsyncError(async (req, res, next) => {
  const userId = req.session.user?._id;
  const item = req.body.item;

  if (!userId || !item)
    return next(new ErrorHandler("UserId and item not found", 404));

  if (!item.quantity) {
    item.quantity = 1;
  }

  let cart = await Cart.findOne({ userId });

  if (cart) {
    const itemIndex = cart.items.findIndex((it) => it._id == item._id);
    if (itemIndex >= 0) {
      cart.items.splice(itemIndex, 1, item);
    } else {
      cart.items.push(item);
    }
  } else {
    cart = new Cart();
    cart.userId = userId;
    cart.items = [item];
  }
  cart.save();

  res.status(200).json({
    status: true,
    cart,
    message: "cart add successfuly",
  });
});

export const getCart = catchAsyncError(async (req, res, next) => {
  const userId = req.session.user?._id;
  const cart = await Cart.findOne({ userId });
  if (!cart) return next(new ErrorHandler("Item not found", 404));
  res.status(200).json({
    status: true,
    items: cart,
    message: "get all cart",
  });
});

export const removeItem = catchAsyncError(async (req, res, next) => {
  const userId = req.session.user?._id;
  const item = req.body.item;

  const cart = await Cart.findOne({ userId });
  if (!cart) return next(new ErrorHandler("Item not found", 404));

  const itemIndex = cart.items.findIndex((it) => it._id == item._id);
  cart.items.splice(itemIndex, 1);
  cart.save();

  res.status(200).json({
    status: true,
    items: cart,
    message: "remove item successfuly",
  });
});

export const emptyCart = catchAsyncError(async (req, res, next) => {
  const userId = req.session.user?._id;
  if (!userId) return next(new ErrorHandler("Please login first", 404));

  const cart = await Cart.findOne(userId);
  if (!cart) return next(new ErrorHandler("User has no add to cart", 404));

  cart.items = [];
  cart.save();

  res.status(200).json({
    status: true,
    items: cart,
    message: "empty cart successfuly",
  });
});
