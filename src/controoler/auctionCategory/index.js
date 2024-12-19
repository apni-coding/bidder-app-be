const auctionCategoryService = require("../../service/auctionCategory/auctionCategoryService");
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../utils/propertyResolver");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");

const createAuctionCategory = async (req, res) => {
  try {
    const result = await auctionCategoryService.saveAuctionCategory(req.body);
    sendSuccessResponse(
      res,
      SUCCESS_MESSAGE.AUCTION_CATEGORY_CREATED,
      result,
      200
    );
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const allAuctionCategory = async (req, res) => {
  try {
    const result = await auctionCategoryService.getAllAuctionCategory();
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
      "",
      500
    );
  }
};

module.exports = { createAuctionCategory, allAuctionCategory };
