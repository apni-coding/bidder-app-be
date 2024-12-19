const express = require("express");
const authRouter = require("./auth");
const auctionCategoryRouter = require("./auctionCategory");

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/auction-category", auctionCategoryRouter);


module.exports = indexRouter;


