const express = require("express");
const authRouter = require("./auth");
const auctionCategoryRouter = require("./auctionCategory");
const auctionRouter = require("./auction");
const bidRouter = require("./bid");

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/auction-category", auctionCategoryRouter);
indexRouter.use("/auction", auctionRouter);
indexRouter.use("/bid", bidRouter);



module.exports = indexRouter;


