import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Order } from "../models/Order.js";
import { User } from "../models/User.js";

export const order = catchAsyncError(async (req, res, next) => {
  const userId = req.session.user?._id;
  const order = req.body.order;
  if (!order) return next(new ErrorHandler("Please enter order", 401));

  let newOrder = new Order(order);
    let savedOrder = await newOrder.save();
    
    const user = await User.findOne({ userId });
    user.orders.push(savedOrder._id);
    user.save();

    res.status(200).json({
      status: true,
      order: savedOrder,
      message: "order save successfuly",
    });
});
