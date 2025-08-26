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
    const { id: userId } = req.user;
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

const myBidList = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { page, limit, sortBy, minBidAmount, maxBidAmount, status, search } =
      req.body;
    const result = await bidService.myBidList({
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      sortBy,
      minBidAmount,
      maxBidAmount,
      status,
      search,
      userId
    });
    sendSuccessResponse(
      res,
      SUCCESS_MESSAGE.DATA_FETCH_SUCCESSFULLY,
      result,
      200
    );
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      500
    );
  }
};

const bidListOnAuction = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const auction_id = req.params.auction_id;
    if(!auction_id){
      throw new Error(ERROR_MESSAGE.AUCTION_ID_REQUIRED)
    }
    const result = await bidService.bidListByAuctionId(auction_id, userId);
    sendSuccessResponse(
      res,
      SUCCESS_MESSAGE.DATA_FETCH_SUCCESSFULLY,
      result,
      200
    );
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      500
    );
  }
};
module.exports = { createBid, myBidList, bidListOnAuction };
