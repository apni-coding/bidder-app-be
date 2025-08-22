const userService = require("../../service/user/userService");
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../utils/propertyResolver");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");
const bcrypt = require("bcrypt");

const getLoginUserDetail = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const result = await userService.findUserById(userId);
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

const getUserDetailById = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const result = await userService.findUserById(userId);
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

const updateUserById = async (req, res) => {
  try {
    const updateData = req.body;
    if (updateData.password) {
      const hashPassword = await bcrypt.hash(updateData.password, 10);
      updateData.password = hashPassword
    }
    const result = await userService.updateUserById(updateData);

    sendSuccessResponse(
      res,
      SUCCESS_MESSAGE.DATA_UPDATED_SUCCESSFULLY,
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

const deleteUserById = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const result = await userService.deleteUserById(userId);

    sendSuccessResponse(
      res,
      SUCCESS_MESSAGE.DATA_DELETED_SUCCESSFULLY,
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

module.exports = {
  getLoginUserDetail,
  getUserDetailById,
  updateUserById,
  deleteUserById,
};
