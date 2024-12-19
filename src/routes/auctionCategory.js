const express = require("express");
const auctionCategoryController = require('../controoler/auctionCategory/index')

const auctionCategoryRouter = express.Router();

auctionCategoryRouter.post('/create', auctionCategoryController.createAuctionCategory)

module.exports = auctionCategoryRouter;
