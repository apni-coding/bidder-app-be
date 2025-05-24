const express = require("express");
const auctionController = require("../controoler/admin/auctionControoler");
const userController = require("../controoler/admin/userControoler");
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
adminRouter.post("/user-list", authenticateToken, userController.getUserList);

module.exports = adminRouter;
