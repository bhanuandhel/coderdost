import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// get All Products
router.route("/products").get(getAllProducts);

// create new course - only admin
router.route("/createproduct").post(createProduct);

router
  .route("/product/:id")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
