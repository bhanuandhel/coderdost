import express from "express"
import { login, logout, register } from "../controllers/userController.js";


const router = express.Router();

// To register a new user
router.route("/register").post(register);

// To login
router.route("/login").post(login);

// to logout
router.route("/logout").get(logout);

export default router;