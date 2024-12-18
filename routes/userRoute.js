import { register, login, getUser } from "../controllers/userController.js";
import express from "express";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/getUser", authMiddleware, getUser);

export default router;