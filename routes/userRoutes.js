import express from "express"
import { getMe, login, logout, register, updateUserAddress } from "../controllers/userController.js";


const router = express.Router();

// To register a new user
router.route("/register").post(register);

// To login
router.route("/login").post(login);

// get user login details
router.route("/me").get(getMe);

// to logout
router.route("/logout").get(logout);

// to update User Address
router.route("/updateUserAddress").post(updateUserAddress);

export default router;