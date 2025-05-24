const userService = require("../../service/admin/userService");
const {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  ROLE_ID,
} = require("../../utils/propertyResolver");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../utils/response");

const getUserList = async (req, res) => {
  try {
    const { role_id } = req.user;
    if (![ROLE_ID.ADMIN, ROLE_ID.SUPER_ADMIN].includes(role_id)) {
      throw new Error(ERROR_MESSAGE.UNAUTHORIZED_USER);
    }
    const result = await userService.getUserList(req.body, role_id);
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

module.exports = {getUserList};
