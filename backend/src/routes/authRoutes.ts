import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

router.post("/register", authController.register);
router.patch("/verify", authController.verify);
router.post("/login", authController.login);

export default router;
