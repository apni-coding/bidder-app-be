const express = require("express");
const userController = require("../controoler/user/index");
const authenticateToken = require("../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.get("/detail", authenticateToken, userController.getLoginUserDetail);
userRouter.get("/user-detail/:id", authenticateToken, userController.getUserDetailById);

module.exports = userRouter;
