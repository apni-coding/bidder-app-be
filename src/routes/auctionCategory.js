const express = require("express");
const auctionCategoryController = require('../controoler/auctionCategory/index');
const validateSchema = require("../middlewares/validator");
const auctionCategorySchema = require("../middlewares/validationSchema/auctionCategory");

const auctionCategoryRouter = express.Router();

auctionCategoryRouter.post('/create', validateSchema(auctionCategorySchema), auctionCategoryController.createAuctionCategory)

module.exports = auctionCategoryRouter;
