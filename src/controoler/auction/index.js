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

module.exports = {
  createAuction,
};
