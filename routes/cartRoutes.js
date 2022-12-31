import express from "express";
import {
  createCart,
  emptyCart,
  getCart,
  removeItem,
} from "../controllers/cartController.js";

const router = express.Router();
// create new cart
router.route("/cart").post(createCart);

// get cart details
router.route("/cart").get(getCart);

// removeItem from cart
router.route("/removeitem").post(removeItem);

//emptyCart
router.route("/emptycart").get(emptyCart);

export default router;
