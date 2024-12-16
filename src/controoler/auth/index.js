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

const registerUser = async (req, res) => {
  try {
    const { password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const userInfo = await authService.saveUser({
      ...req.body,
      password: hashPassword,
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
