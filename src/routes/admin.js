const express = require("express");
const auctionController = require("../controoler/admin/auctionControoler");
const authenticateToken = require("../middlewares/authMiddleware");
const validateSchema = require("../middlewares/validator");
const updateAuctionStatusSchema = require("../middlewares/validationSchema/updateAuctionStatusSchema");

const adminRouter = express.Router();

adminRouter.post(
  "/auction/update/status",
  validateSchema(updateAuctionStatusSchema),
  authenticateToken,
  auctionController.updateAuctionStatus
);
adminRouter.post(
  "/auctions",
  authenticateToken,
  auctionController.getAuctionList
);

module.exports = adminRouter;
