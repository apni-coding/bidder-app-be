const express = require("express");
const auctionController = require('../controoler/auction/index');
const validateSchema = require("../middlewares/validator");

const authenticateToken = require("../middlewares/authMiddleware");
const createAuctionSchema = require("../middlewares/validationSchema/createAuction");

const auctionRouter = express.Router();

auctionRouter.post('/create', validateSchema(createAuctionSchema), authenticateToken, auctionController.createAuction)
auctionRouter.put('/update/:id', validateSchema(createAuctionSchema), authenticateToken, auctionController.updateAuction)
auctionRouter.get('/', auctionController.getActiveAuctions);
auctionRouter.get('/auction-detail/:id', auctionController.getAuctionDetailById);
auctionRouter.get('/my-auction', authenticateToken, auctionController.getMyAuctions );



module.exports = auctionRouter;
