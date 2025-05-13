const auctionService = require("../../service/admin/auctionService");
const {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  ROLE_ID,
} = require("../../utils/propertyResolver");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../utils/response");

const updateAuctionStatus = async (req, res) => {
  try {
    const { id: userId, role_id } = req.user;
    if (![ROLE_ID.ADMIN, ROLE_ID.SUPER_ADMIN].includes(role_id)) {
      throw new Error(ERROR_MESSAGE.UNAUTHORIZED_USER);
    }
    const result = await auctionService.updateAuctionStatus(req.body, userId);
    sendSuccessResponse(res, SUCCESS_MESSAGE.AUCTION_STATUS, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      500
    );
  }
};

const getAuctionList = async(req, res)=>{
  try {
    const {  role_id } = req.user;
    if (![ROLE_ID.ADMIN, ROLE_ID.SUPER_ADMIN].includes(role_id)) {
      throw new Error(ERROR_MESSAGE.UNAUTHORIZED_USER);
    }
    
    const result = await auctionService.getAuctionList(req.body);
    sendSuccessResponse(res, SUCCESS_MESSAGE.DATA_FETCH_SUCCESSFULLY, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      500
    );
  }
}

module.exports = { updateAuctionStatus, getAuctionList };
