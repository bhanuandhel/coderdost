import express from "express";
import { getAllProducts } from "../controllers/productController.js";

const router = express.Router();

// get All Products
router.route("/products").get(getAllProducts);

export default router;
