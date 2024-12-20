const express = require("express");
const authRouter = require("./auth");
const auctionCategoryRouter = require("./auctionCategory");
const auctionRouter = require("./auction");

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/auction-category", auctionCategoryRouter);
indexRouter.use("/auction", auctionRouter);


module.exports = indexRouter;


