import express from "express";
import { order } from "../controllers/orderController.js";

const router = express.Router();

// create order
router.route("/order").post(order);

export default router;
