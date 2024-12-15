const authService = require("../../service/auth/authService");
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../utils/propertyResolver");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");

const registerUser = async (req, res) => {
  try {
    const userInfo = await authService.saveUser(req.body);

    sendSuccessResponse(res, SUCCESS_MESSAGE.USER_CREATED, userInfo, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

module.exports = { registerUser };
