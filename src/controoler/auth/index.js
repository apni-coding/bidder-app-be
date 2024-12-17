const authService = require("../../service/auth/authService");
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../utils/propertyResolver");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

const registerUser = async (req, res) => {
  try {
    const { password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    //Generate Token
    const accountToken = uuidv4();
    const accountTokenExpiry = Date.now() + 3600000 // token valid for 1 hour

    const userInfo = await authService.saveUser({
      ...req.body,
      password: hashPassword,
      verify_account_token: accountToken,
      verify_account_expires: accountTokenExpiry
    });

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
