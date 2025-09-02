const express = require("express");
const bidController = require('../controoler/bid/index');
const validateSchema = require("../middlewares/validator");
const authenticateToken = require("../middlewares/authMiddleware");
const createBidSchema = require("../middlewares/validationSchema/createBidSchema");

const bidRouter = express.Router();

bidRouter.post('/create', validateSchema(createBidSchema), authenticateToken, bidController.createBid)
bidRouter.post('/my-bid', authenticateToken, bidController.myBidList );
bidRouter.get('/by-auction/:auction_id', authenticateToken, bidController.bidListOnAuction );
bidRouter.get('/approve/:bid_id', authenticateToken, bidController.approveBid );



module.exports = bidRouter;
