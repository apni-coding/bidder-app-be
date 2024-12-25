const bidService = require("../../service/bid/bidService");
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../utils/propertyResolver");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");

const createBid = async (req, res) => {
  try {
    const {id:userId} = req.user;
    const result = await bidService.saveBid({ userId, ...req.body });
    sendSuccessResponse(res, SUCCESS_MESSAGE.BID_CREATE, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      500
    );
  }
};

module.exports = { createBid };
