const Users = require("../../models/user");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");

const findUserById = async (userId) => {
  try {
    const user = await Users.findOne({
      where: { id: userId },
      attributes: {
        exclude: ["password", "verify_account_token", "verify_account_expires"],
      },
    });
    if (!user) {
      throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { findUserById };
