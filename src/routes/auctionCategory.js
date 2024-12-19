const express = require("express");
const auctionCategoryController = require('../controoler/auctionCategory/index');
const validateSchema = require("../middlewares/validator");
const auctionCategorySchema = require("../middlewares/validationSchema/auctionCategory");
const authenticateToken = require("../middlewares/authMiddleware");

const auctionCategoryRouter = express.Router();

auctionCategoryRouter.post('/create', validateSchema(auctionCategorySchema), authenticateToken, auctionCategoryController.createAuctionCategory)
auctionCategoryRouter.get('/', authenticateToken, auctionCategoryController.allAuctionCategory);

module.exports = auctionCategoryRouter;
