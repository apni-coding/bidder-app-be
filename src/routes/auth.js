const express = require("express");
const authController = require("../controoler/auth/index");
const authRouter = express.Router();

authRouter.post("/register", authController.registerUser);

module.exports = authRouter;

// localhost:3001/api/auth/register ---> post method
