import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return next(new ErrorHandler("Please enter all field", 400));

  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User already exit", 409));

  user = await User.create({
    name,
    email,
    password,
    orders: [],
    addresses: [],
  });

  req.session.user = user;

  res.status(201).json({
    status: true,
    user,
    message: "User Successfuly Created",
  });
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Please enter all field", 400));

  const user = await User.findOne({
    email: req.body.email,
  })
    .select("+password")
    .populate("orders");

  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 401));

  req.session.user = user;

  res.status(200).json({
    status: true,
    user,
    message: "User login Successfuly",
  });
});

export const logout = catchAsyncError(async (req, res, next) => {
  req.session.user = null;
  res.status(200).json({
    status: true,
    message: "Logged Out Successfully",
  });
});

export const getMe = catchAsyncError(async (req, res, next) => {
  if (req.session.user) {
    const user = await User.findOne({ email: req.session.user.email }).populate(
      "orders"
    );
    if (!user)
      return next(new ErrorHandler("Please Login first to continue", 401));
    req.session.user = user;
    res.status(200).json({
      status: true,
      user,
      message: "User login Successfuly",
    });
  } else {
    return next(new ErrorHandler("Please Login first to continue", 401));
  }
});

export const updateUserAddress = catchAsyncError(async (req, res, next) => {
  const userId = req.session.user?._id;
  if (!userId) return next(new ErrorHandler("User not found", 401));

  const address = req.body.address;
  if (!address) return next(new ErrorHandler("Please enter address", 401));

  const user = await User.findOne({ userId });
  user.address.push(address);
  user.save();

  res.status(200).json({
    status: true,
    user,
    message: "Address update Successfuly",
  });
});
