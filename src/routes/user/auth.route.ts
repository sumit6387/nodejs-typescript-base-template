import express from "express";
import { loginUser, register } from "../../controllers/user/auth.controller";
import { loginValidation, registerValidation } from "../../validations/auth.validation";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, loginUser);

export default router;
