const express = require("express");
const authController = require("../controoler/auth/index");
const validateSchema = require("../middlewares/validator");
const registerSchema = require("../middlewares/validationSchema/resigsterUser");
const loginSchema = require("../middlewares/validationSchema/loginUser");
const forgotPasswordSchema = require("../middlewares/validationSchema/forgotPassword");
const resetPasswordSchema = require("../middlewares/validationSchema/resetPassword");
const authRouter = express.Router();

authRouter.post("/register", validateSchema(registerSchema), authController.registerUser);
authRouter.get("/verify-account/:token", authController.verifyAccount);
authRouter.post("/login", validateSchema(loginSchema), authController.loginUser);
authRouter.post("/forgot-password", validateSchema(forgotPasswordSchema), authController.forgotPassword);
authRouter.post("/reset-password/:token", validateSchema(resetPasswordSchema), authController.updatePassword);

module.exports = authRouter;


