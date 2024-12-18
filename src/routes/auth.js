const express = require("express");
const authController = require("../controoler/auth/index");
const validateSchema = require("../middlewares/validator");
const registerSchema = require("../middlewares/validationSchema/resigsterUser");
const loginSchema = require("../middlewares/validationSchema/loginUser");
const forgotPasswordSchema = require("../middlewares/validationSchema/forgotPassword");
const authRouter = express.Router();

authRouter.post("/register", validateSchema(registerSchema), authController.registerUser);
authRouter.get("/verify-account/:token", authController.verifyAccount);
authRouter.post("/login", validateSchema(loginSchema), authController.loginUser);
authRouter.post("/forgot-password", validateSchema(forgotPasswordSchema), authController.forgotPassword);

module.exports = authRouter;


