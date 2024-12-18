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
const { v4: uuidv4 } = require("uuid");

const registerUser = async (req, res) => {
  try {
    const { password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    //Generate Token
    const accountToken = uuidv4();
    const accountTokenExpiry = Date.now() + 3600000; // token valid for 1 hour

    const userInfo = await authService.saveUser({
      ...req.body,
      password: hashPassword,
      verify_account_token: accountToken,
      verify_account_expires: accountTokenExpiry,
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

const verifyAccount = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      throw new Error(ERROR_MESSAGE.INVALID_TOKEN);
    }
    const result = await authService.verifyAccountDetail(token);
    sendSuccessResponse(res, SUCCESS_MESSAGE.ACCOUNT_VERIFIED, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, remember_password } = req.body;
    const result = await authService.loginUser(
      email,
      password,
      remember_password
    );
    sendSuccessResponse(res, SUCCESS_MESSAGE.USER_LOGIN, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const forgotPassword = async (req, res) => {
  try {
    //Generate Token
    const token = uuidv4();
    const tokenExpiryTime = Date.now() + 3600000; // token valid for 1 hour

    const result = await authService.forgotPassword(
      req.body.email,
      token,
      tokenExpiryTime
    );

    sendSuccessResponse(res, SUCCESS_MESSAGE.FORGOT_EMAIL_SEND, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const updatePassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!token) {
      throw new Error(ERROR_MESSAGE.INVALID_TOKEN);
    }
    
    const result = await authService.resetUserPassword(token, password);

    sendSuccessResponse(res, SUCCESS_MESSAGE.FORGOT_EMAIL_SEND, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

module.exports = {
  registerUser,
  verifyAccount,
  loginUser,
  forgotPassword,
  updatePassword,
};
