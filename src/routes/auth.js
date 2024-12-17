const express = require("express");
const authController = require("../controoler/auth/index");
const validateSchema = require("../middlewares/validator");
const registerSchema = require("../middlewares/validationSchema/resigsterUser");
const authRouter = express.Router();

authRouter.post("/register", validateSchema(registerSchema), authController.registerUser);

module.exports = authRouter;

//http://localhost:3001/api/auth/register ---> post method
