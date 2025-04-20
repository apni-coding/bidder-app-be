const express = require("express");
const awsController = require("../controoler/aws/index");
const authenticateToken = require("../middlewares/authMiddleware");

const awsRouter = express.Router();

awsRouter.get(
  "/get-presigned-url",
  authenticateToken,
  awsController.generatePreSignedUrl
);

module.exports = awsRouter;
