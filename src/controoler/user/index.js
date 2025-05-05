const userService = require("../../service/user/userService");
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../utils/propertyResolver");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");

const getLoginUserDetail = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const result = await userService.findUserById( userId );
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

module.exports = { getLoginUserDetail };
