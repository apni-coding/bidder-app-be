const express = require("express");
const bidController = require('../controoler/bid/index');
const validateSchema = require("../middlewares/validator");
const authenticateToken = require("../middlewares/authMiddleware");
const createBidSchema = require("../middlewares/validationSchema/createBidSchema");

const bidRouter = express.Router();

bidRouter.post('/create', validateSchema(createBidSchema), authenticateToken, bidController.createBid)




module.exports = bidRouter;
