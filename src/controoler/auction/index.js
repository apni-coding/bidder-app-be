const auctionService = require("../../service/auction/auctionService");
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../utils/propertyResolver");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");

const createAuction = async (req, res) => {
  try {
    const { id: userId } = req.user;

    // Call the service to create an auction
    const newAuction = await auctionService.createAuction(req.body, userId);

    sendSuccessResponse(res, SUCCESS_MESSAGE.AUCTION_CREATED, newAuction, 200);
  } catch (err) {
    sendErrorResponse(
      res,
      err.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      500
    );
  }
};

const updateAuction = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const auctionId = req.params.id;

    if (!auctionId) {
      throw new Error(ERROR_MESSAGE.AUCTION_ID_REQUIRED);
    }

    // Call the service to update the auction
    const updatedAuction = await auctionService.updateAuction(
      auctionId,
      userId,
      req.body
    );

    sendSuccessResponse(
      res,
      SUCCESS_MESSAGE.AUCTION_UPDATED,
      updatedAuction,
      200
    );
  } catch (err) {
    sendErrorResponse(
      res,
      err.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      500
    );
  }
};

const getActiveAuctions = async (req, res) => {
  try {
    const { page, limit, minPrice, maxPrice, sortBy, categoryId } = req.query;
    const auctions = await auctionService.getActiveAuctions({
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      minPrice,
      maxPrice,
      sortBy,
      categoryId,
    });
    sendSuccessResponse(
      res,
      SUCCESS_MESSAGE.DATA_FETCH_SUCCESSFULLY,
      auctions,
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

module.exports = {
  createAuction,
  updateAuction,
  getActiveAuctions,
};
